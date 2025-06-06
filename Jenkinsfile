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
                sh 'npm ci'
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building the application...'
                sh 'npm run build'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'echo "No tests configured yet - this is a demo app"'
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
                sh """
                    docker run -d --name test-container -p 8080:80 ${DOCKER_IMAGE}
                    sleep 10
                    curl -f http://localhost:8080 || exit 1
                    docker stop test-container
                    docker rm test-container
                """
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment...'
                sh """
                    docker stop ${APP_NAME}-staging || true
                    docker rm ${APP_NAME}-staging || true
                    docker run -d --name ${APP_NAME}-staging -p 3000:80 ${DOCKER_IMAGE}
                """
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                script {
                    sleep(time: 10, unit: 'SECONDS')
                    sh 'curl -f http://localhost:3000 || exit 1'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed!'
            // Clean up test containers
            sh """
                docker stop test-container || true
                docker rm test-container || true
            """
        }
        success {
            echo 'Pipeline succeeded! 🎉'
            echo "Application deployed at: http://localhost:3000"
        }
        failure {
            echo 'Pipeline failed! 😞'
            // Clean up on failure
            sh """
                docker stop ${APP_NAME}-staging || true
                docker rm ${APP_NAME}-staging || true
            """
        }
    }
}