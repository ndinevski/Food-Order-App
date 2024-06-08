pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
        DOCKER_IMAGE = 'ndinevski/food-app'
        NODE_VERSION = '18.17.1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ndinevski/Food-Order-App.git'
            }
        }

        
        stage('Install Dependencies') {
            steps {
                sh 'cd client && npm install && cd .. && cd backend && npm install && cd ..'
            }
        }
        
        stage('Build') {
            steps {
                sh 'cd client && npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE}:latest")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "${env.DOCKERHUB_CREDENTIALS_ID}") {
                        docker.image("${env.DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build and tests completed successfully.'
        }
        failure {
            echo 'Build or tests failed.'
        }
    }
}
