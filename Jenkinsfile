pipeline {

    agent any

    environment {
        GIT_REPO   = 'https://github.com/youssoulam/tp_site_esmt.git'
        GIT_BRANCH  = 'main'
        IMAGE_NAME  = 'tp-site-esmt'
        CONTAINER   = 'site-esmt'
        PORT        = '8082'
    }

    stages {

        stage('Configurer Git safe.directory') {
            steps {
                sh 'git config --global --add safe.directory $PWD'
            }
        }

        stage('Checkout') {
            steps {
                git credentialsId: 'github-token',
                    url: "${GIT_REPO}",
                    branch: "${GIT_BRANCH}"
            }
        }

        stage('Vérifier Docker') {
            steps {
                sh 'docker version'
            }
        }

        stage('Nettoyer conteneur existant') {
            steps {
                sh """
                docker rm -f ${CONTAINER} || true
                """
            }
        }

        stage('Build image Docker') {
            steps {
                sh """
                docker build -t ${IMAGE_NAME}:latest .
                """
            }
        }

        stage('Tests (optionnel)') {
            steps {
                sh 'echo "✅ Aucun test automatisé pour ce TP"'
            }
        }

        stage('Déploiement local') {
            steps {
                sh """
                docker run -d \
                --name ${CONTAINER} \
                -p ${PORT}:80 \
                ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Health Check') {
            steps {
                sh """
                sleep 3
                curl -f http://localhost:${PORT} || exit 1
                """
            }
        }
    }

    post {

        success {
            echo "✅ Déploiement réussi → http://localhost:${PORT}"
        }

        failure {
            echo "❌ Pipeline échoué"
        }
    }
}
