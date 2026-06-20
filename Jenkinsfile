pipeline {

    agent any

    environment {
        IMAGE_NAME     = "tp-site-esmt"
        CONTAINER_NAME = "tp-site-esmt-container"
        HOST_PORT      = "8082"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Injection build') {
            steps {
                sh '''
                sed "s/BUILD_NUMBER/${BUILD_NUMBER}/" index.html > tmp.html && mv tmp.html index.html
                sed "s/BUILD_DATE/$(date '+%d-%m-%Y %H:%M:%S')/" index.html > tmp2.html && mv tmp2.html index.html
                '''
            }
        }

        stage('Build Docker') {
            steps {
                sh '''
                docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest . || exit 1
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true

                docker run -d \
                --name ${CONTAINER_NAME} \
                -p ${HOST_PORT}:80 \
                ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        success {
            echo "OK - Site deploye sur http://localhost:${HOST_PORT}"
        }
    }
}
