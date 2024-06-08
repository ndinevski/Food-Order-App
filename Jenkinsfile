pipeline {
    agent any
    
    environment {
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
                sh 'npm install && cd backend && npm install && cd ..'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'build/**/*', allowEmptyArchive: true
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
