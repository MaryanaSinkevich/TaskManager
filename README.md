# Simple Task Manager

A lightweight task management web application built for Jenkins and Docker testing.

## Features

- ✅ Add, complete, and delete tasks
- 📊 Task statistics (total/completed)
- 💾 Local storage persistence
- 📱 Responsive design
- 🐳 Docker ready
- 🔧 Jenkins pipeline included

## Quick Start

### Development Mode

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - The app will be available at `http://localhost:5173`
   - You should see a task manager with some demo tasks

### Production Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Preview production build:**
   ```bash
   npm run preview
   ```

## Docker Usage

### Build Docker Image

```bash
docker build -t simple-task-app .
```

### Run with Docker

```bash
docker run -d -p 8080:80 simple-task-app
```

The app will be available at `http://localhost:8080`

### Docker Compose (Optional)

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  task-app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run with: `docker-compose up -d`

## Jenkins Pipeline

The included `Jenkinsfile` provides a complete CI/CD pipeline:

1. **Checkout** - Get source code
2. **Install Dependencies** - Run `npm ci`
3. **Build** - Create production build
4. **Test** - Run application tests
5. **Docker Build** - Create Docker image
6. **Docker Test** - Test the container
7. **Deploy** - Deploy to staging
8. **Health Check** - Verify deployment

### Pipeline Requirements

- Jenkins with Docker plugin
- Node.js plugin or Node.js installed on Jenkins agent
- Docker installed on Jenkins agent

## Testing the App

### Manual Testing

1. **Add tasks** - Type in the input field and click "Add Task"
2. **Complete tasks** - Check the checkbox next to any task
3. **Delete tasks** - Click the × button
4. **Clear functions** - Use "Clear Completed" or "Clear All" buttons
5. **Persistence** - Refresh the page to see tasks are saved

### Automated Testing

The app includes basic health checks in the Docker and Jenkins configurations.

## File Structure

```
├── index.html          # Main HTML file
├── main.js             # Application logic
├── style.css           # Styling
├── package.json        # Dependencies and scripts
├── Dockerfile          # Docker configuration
├── Jenkinsfile         # Jenkins pipeline
└── README.md           # This file
```

## Perfect for Testing

This app is ideal for Jenkins and Docker testing because:

- **Lightweight** - Only a few files, quick builds
- **Self-contained** - No external dependencies in runtime
- **Health checks** - Built-in endpoints for monitoring
- **Visual feedback** - Easy to verify deployment success
- **Production-ready** - Includes proper build process

## Troubleshooting

### Development Issues

- **Port already in use:** Change port in `package.json` dev script
- **Build failures:** Check Node.js version (requires Node 16+)

### Docker Issues

- **Container won't start:** Check if port 80 is available
- **Health check fails:** Ensure nginx is properly configured

### Jenkins Issues

- **Build fails:** Verify Node.js and Docker are installed
- **Permission errors:** Check Docker daemon permissions
- **Port conflicts:** Adjust ports in Jenkinsfile

## License

This is a demo application for testing purposes.