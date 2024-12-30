# Sample Go/React GitStack

A real-time GitHub repository analytics dashboard built with Go and React. This sample demonstrates how to create a full-stack application using Daytona's development environment capabilities.

---

## 🚀 Getting Started

### Open Using Daytona

1. **Install Daytona**: Follow the [Daytona installation guide](https://www.daytona.io/docs/installation/installation/).

2. **Create the Workspace**:
   ```bash
   daytona create https://github.com/yourusername/GitStack
   ```

3. **Set up GitHub Token**:
   - Create a [GitHub Personal Access Token](https://github.com/settings/tokens)
   - Add it to `backend/.env`:
     ```bash
     echo "GITHUB_TOKEN=your_token_here" > backend/.env
     ```

4. **Start the Application**:
   ```bash
   # Terminal 1 - Start the backend
   cd backend && go run main.go

   # Terminal 2 - Start the frontend
   cd frontend && npm run dev
   ```

---

## ✨ Features

- **Standardized Development Environment**: Consistent setup using devcontainers
- **Full-Stack Application**: Go backend with React frontend
- **Real-time Analytics**: Track GitHub repository metrics
  - Commit history
  - Pull requests
  - Issues
  - Contributors
- **Repository Comparison**: Compare metrics between different repositories
- **Modern UI**: Responsive design with dark mode and glassmorphism effects
- **Data Visualization**: Interactive charts using Recharts
- **Type Safety**: Full TypeScript support
- **Development Tools**:
  - Hot reloading
  - ESLint configuration
  - Prettier formatting
  - Go debugging support

---

## 🛠️ Tech Stack

- **Backend**:
  - Go 1.21
  - GitHub API v3
  - godotenv for configuration

- **Frontend**:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Recharts for data visualization
  - Lucide Icons

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

