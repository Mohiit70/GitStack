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
	"golang.org/x/oauth2"
)

type RepoStats struct {
	CommitsCount      int    `json:"commitsCount"`
	PRsCount          int    `json:"prsCount"`
	IssuesCount       int    `json:"issuesCount"`
	LastUpdated       string `json:"lastUpdated"`
	ContributorsCount int    `json:"contributorsCount"`
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
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	http.HandleFunc("/api/stats", func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "*")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		owner := r.URL.Query().Get("owner")
		repo := r.URL.Query().Get("repo")

		if owner == "" || repo == "" {
			http.Error(w, "owner and repo parameters are required", http.StatusBadRequest)
			return
		}

		stats := &RepoStats{}

		// Get commits
		commits, _, err := client.Repositories.ListCommits(ctx, owner, repo, nil)
		if err != nil {
			log.Printf("Failed to get commits: %v", err)
			http.Error(w, "Failed to get commits", http.StatusInternalServerError)
			return
		}
		stats.CommitsCount = len(commits)

		// Get PRs
		prs, _, err := client.PullRequests.List(ctx, owner, repo, nil)
		if err != nil {
			log.Printf("Failed to get PRs: %v", err)
			http.Error(w, "Failed to get PRs", http.StatusInternalServerError)
			return
		}
		stats.PRsCount = len(prs)

		// Get issues
		issues, _, err := client.Issues.ListByRepo(ctx, owner, repo, nil)
		if err != nil {
			log.Printf("Failed to get issues: %v", err)
			http.Error(w, "Failed to get issues", http.StatusInternalServerError)
			return
		}
		stats.IssuesCount = len(issues)

		// Get contributors
		contributors, _, err := client.Repositories.ListContributors(ctx, owner, repo, nil)
		if err != nil {
			log.Printf("Failed to get contributors: %v", err)
			http.Error(w, "Failed to get contributors", http.StatusInternalServerError)
			return
		}
		stats.ContributorsCount = len(contributors)

		stats.LastUpdated = time.Now().UTC().Format(time.RFC3339)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(stats)
	})

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
