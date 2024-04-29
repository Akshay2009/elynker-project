pipeline {
    agent any
    stages{
        stage("checkout"){
            steps{
                checkout scm
            }
        }
        stage("Test"){
            steps{
                sh 'sudo apt install npm'
                sh 'npm test'
            }
        }
        stage("Build"){
            steps{
                sh 'npm run build'
            }
        }
        stage("Build Image") {
            steps {
                script {
                    sh 'docker build -t nodejs_pipeline .'
                }
            }
    }
    }
}
