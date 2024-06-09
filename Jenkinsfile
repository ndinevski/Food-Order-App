pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
        DOCKER_IMAGE = 'ndinevski/food-app'
        GITHUB_CREDENTIALS_ID = 'github'
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
                    #!/bin/bash
                    sed -i "s|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:${BUILD_ID}|" deployment.yaml
                    '''

                    withCredentials([usernamePassword(credentialsId: "${GITHUB_CREDENTIALS_ID}", usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        sh '''
                        #!/bin/bash
                        git config user.email "ndinevski5@gmail.com"
                        git config user.name "ndinevski"
                        git add deployment.yaml
                        git commit -m "Update image tag to ${BUILD_ID}"
                        git push https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/ndinevski/Food-Order-App.git HEAD:main
                        '''
                }
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
