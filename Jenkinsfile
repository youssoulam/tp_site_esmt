pipeline {

    agent any

    environment {
        IMAGE_NAME = "tp-site-esmt"
        CONTAINER_NAME = "site-esmt"
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/youssoulam/tp_site_esmt.git'
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t tp-site-esmt .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop site-esmt || true
                docker rm site-esmt || true

                docker run -d \
                    --name site-esmt \
                    -p 8082:80 \
                    tp-site-esmt
                '''
            }
        }
    }
}
