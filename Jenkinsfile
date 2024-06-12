pipeline {
    agent any

    environment {
        NODE_VERSION = '18.x' // Specify your node version
    }

    stages {
        stage('Checkout Main Project') {
            steps {
                // Clone CGI-demo repository
                git url: 'https://github.com/AOURAGHLoubnaCGI/CGI-Demo.git', branch: 'main'
            }
        }

        stage('Checkout Cypress Project') {
            steps {
                // Clone the Cypress project repository
                dir('cypress-project') {
                    git url: 'https://github.com/AOURAGHLoubnaCGI/CGI-Demo-Tests.git', branch: 'main'
                }
            }
        }

        stage('Setup Node.js') {
            steps {
                // Setup Node.js
                tool name: 'NodeJS', type: 'NodeJS'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies for the Cypress project
                dir('cypress-project') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Run Cypress tests from the Cypress project directory
                dir('cypress-project') {
                    sh 'npx cypress run'
                }
            }
        }

        stage('Post Actions') {
            steps {
                // Any post actions if required
                echo 'Tests completed!'
            }
        }
    }

    post {
        always {
            // Archive test results
            archiveArtifacts artifacts: '**/cypress-project/cypress/screenshots/**, **/cypress-project/cypress/videos/**'
            junit 'cypress-project/cypress/results/**/*.xml'
        }
        failure {
            mail to: 'your-email@example.com',
                 subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                 body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}
