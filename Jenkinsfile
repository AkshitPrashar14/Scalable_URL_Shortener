pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'YOUR_GITHUB_REPO_URL'
            }
        }

        stage('Build Docker Containers') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                bat 'docker compose down'
            }
        }

        stage('Start Updated Containers') {
            steps {
                bat 'docker compose up -d'
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful 🚀'
        }

        failure {
            echo 'Pipeline Failed ❌'
        }
    }
}