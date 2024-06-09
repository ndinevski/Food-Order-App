pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
        DOCKER_IMAGE = 'ndinevski/food-app'
        DOCKER_BUILDKIT = '1'
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

         stage('Update Kubernetes Manifests') {
            steps {
                script {
                    sh '''
                    sed -i 's|image: ${env.DOCKER_IMAGE}:.*|image: ${env.DOCKER_IMAGE}:${env.BUILD_ID}|' manifests/deployment.yaml
                    '''

                    sh '''
                    git config user.email "ndinevski5@gmail.com"
                    git config user.name "ndinevski"
                    git add manifests/deployment.yaml
                    git commit -m "Update image tag to ${env.BUILD_ID}"
                    git push origin HEAD:master
                    '''
                }
            }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Docker image built, pushed and Kubernetes manifests updated successfully.'
        }
        failure {
            echo 'Failed to build, push Docker image, or update Kubernetes manifests.'
        }
    }
}
