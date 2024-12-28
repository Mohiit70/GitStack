package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/google/go-github/v57/github"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"golang.org/x/oauth2"
)

type RepoStats struct {
	CommitsCount      int       `json:"commitsCount"`
	PRsCount         int       `json:"prsCount"`
	IssuesCount      int       `json:"issuesCount"`
	LastUpdated      time.Time `json:"lastUpdated"`
	ContributorsCount int      `json:"contributorsCount"`
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		log.Fatal("GITHUB_TOKEN is required")
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	mux := http.NewServeMux()
	
	mux.HandleFunc("/api/stats", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		owner := r.URL.Query().Get("owner")
		repo := r.URL.Query().Get("repo")
		
		if owner == "" || repo == "" {
			http.Error(w, "owner and repo parameters are required", http.StatusBadRequest)
			return
		}

		stats := &RepoStats{}
		
		// Get commit count
		commits, _, err := client.Repositories.ListCommits(ctx, owner, repo, nil)
		if err != nil {
			http.Error(w, "Failed to fetch commits: "+err.Error(), http.StatusInternalServerError)
			return
		}
		stats.CommitsCount = len(commits)

		// Get PR count
		prs, _, err := client.PullRequests.List(ctx, owner, repo, nil)
		if err != nil {
			http.Error(w, "Failed to fetch PRs: "+err.Error(), http.StatusInternalServerError)
			return
		}
		stats.PRsCount = len(prs)

		// Get issues count
		issues, _, err := client.Issues.ListByRepo(ctx, owner, repo, nil)
		if err != nil {
			http.Error(w, "Failed to fetch issues: "+err.Error(), http.StatusInternalServerError)
			return
		}
		stats.IssuesCount = len(issues)

		// Get contributors count
		contributors, _, err := client.Repositories.ListContributors(ctx, owner, repo, nil)
		if err != nil {
			http.Error(w, "Failed to fetch contributors: "+err.Error(), http.StatusInternalServerError)
			return
		}
		stats.ContributorsCount = len(contributors)

		stats.LastUpdated = time.Now()

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(stats); err != nil {
			http.Error(w, "Failed to encode response: "+err.Error(), http.StatusInternalServerError)
			return
		}
	})

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Content-Type"},
		MaxAge:         300,
	})

	handler := corsMiddleware.Handler(mux)
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}