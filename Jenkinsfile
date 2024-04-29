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
        stage("Build Image"){
            sh 'docker build -t node_pipeline:1.0 .'
        }
    }
}