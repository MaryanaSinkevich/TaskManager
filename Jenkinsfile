pipeline {
    agent any
    
    environment {
        APP_NAME = 'simple-task-app'
        DOCKER_IMAGE = "${APP_NAME}:${BUILD_NUMBER}"
        DOCKER_LATEST = "${APP_NAME}:latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm ci'
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building the application...'
                bat 'npm run build'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                bat 'echo "No tests configured yet - this is a demo app"'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    docker.build("${DOCKER_IMAGE}")
                    docker.build("${DOCKER_LATEST}")
                }
            }
        }
        
        stage('Test Docker Image') {
            steps {
                echo 'Testing Docker image...'
                bat """
                    docker run -d --name test-container -p 8080:80 ${DOCKER_IMAGE}
                    timeout /t 10 /nobreak
                    curl -f http://localhost:8080 || exit 1
                    docker stop test-container
                    docker rm test-container
                """
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment...'
                bat """
                    docker stop ${APP_NAME}-staging 2>nul || echo "Container not running"
                    docker rm ${APP_NAME}-staging 2>nul || echo "Container not found"
                    docker run -d --name ${APP_NAME}-staging -p 3000:80 ${DOCKER_IMAGE}
                """
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                script {
                    sleep(time: 10, unit: 'SECONDS')
                    bat 'curl -f http://localhost:3000 || exit 1'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed!'
            // Clean up test containers
            bat """
                docker stop test-container 2>nul || echo "Test container not running"
                docker rm test-container 2>nul || echo "Test container not found"
            """
        }
        success {
            echo 'Pipeline succeeded! 🎉'
            echo "Application deployed at: http://localhost:3000"
        }
        failure {
            echo 'Pipeline failed! 😞'
            // Clean up on failure
            bat """
                docker stop ${APP_NAME}-staging 2>nul || echo "Staging container not running"
                docker rm ${APP_NAME}-staging 2>nul || echo "Staging container not found"
            """
        }
    }
}
