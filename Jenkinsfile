pipeline {
		agent any
								
		environment {
                pathPubli = 'D:\\wwwroot\\TPO'
			
	    }
		stages {

			stage('Restore'){
				steps{		
					echo 'Restaurando...' 					
					bat "npm install"
				}
			}

			 stage('Build Prod') { 
			  		steps { 
			  			echo 'Compilando Prod...' 
			  		bat "npm run build -- --output-path=%DEPLOY_PATH_SITIOS_WEB%\\TTPO_PROD"	
			  	}
			 }
			
			stage('Publish'){
				steps{
					echo 'Publicando...' 				
					bat "(robocopy /E \"%DEPLOY_PATH_SITIOS_WEB%\\TPO_TEST\" \"${pathPubli}\" /XF %DEPLOY_PATH_SITIOS_WEB%\\TPO\\Web.config  ) ^& IF %ERRORLEVEL% LEQ 1 exit /B 0"
					
					}
				}
		}
						
		post {  
			always {  			        					
					echo '' 																
				//emailext body: '''${SCRIPT, template="email-html.template"}''', mimeType: 'text/html', subject: "[Jenkins] ${jobName}", to: 'gastogomez@uade.edu.ar'
					}  
			success { 
				 script { 
				 	echo 'This will run only if successful'  
				 	cest = TimeZone.getTimeZone("CEST")
				 	def cest = new Date()
				 	println(cest) 
				 	//def mailRecipients = 'traveldiariesforu@gmail.com'
				 	def jobName = currentBuild.fullDisplayName
				 	//env.Name = Name
				 	env.cest = cest
				 	emailext body: '''${SCRIPT, template="groovy-html.template"}''',
				 	mimeType: 'text/html',
				 	subject: "[Jenkins] ${jobName}",
				 	to: "gaston.alejandro.gmz@gmail.com"
				 	//emailext body: '<br>Project: $PROJECT_NAME <br> Build # $BUILD_NUMBER <br> $BUILD_STATUS: <br> Check console output at $BUILD_URL to view the results.' , subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'gastogomez@uade.edu.ar'
				 		}
					}  
			failure {  
					 script { 
					 echo 'This will run only if failure'  
					 cest = TimeZone.getTimeZone("CEST")
					 def cest = new Date()
					 println(cest) 
					 //def mailRecipients = 'traveldiariesforu@gmail.com'
					 def jobName = currentBuild.fullDisplayName
					 def buildNumber = currentBuild.number
					 def buildStatus = currentBuild.result
					 //env.Name = Name
					 env.cest = cest
					 emailext body: '''${SCRIPT, template="groovy-html.template"}''',
					 mimeType: 'text/html',
					 subject: "[Jenkins] ${jobName} - ${buildStatus}!",
					 to: "gaston.alejandro.gmz@gmail.com"
					 //emailext body: '<br>Project: $PROJECT_NAME <br> Build # $BUILD_NUMBER <br> $BUILD_STATUS: <br> Check console output at $BUILD_URL to view the results.' , subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'gastogomez@uade.edu.ar'
					 	}

					//emailext body: '<br>Project:  $PROJECT_NAME <br>Build Number: #$BUILD_NUMBER <br> URL de build: $BUILD_URL' , subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'gastogomez@uade.edu.ar'
					}
			unstable {  
				echo 'This will run only if the run was marked as unstable'  
					}  
			changed {  
				echo 'This will run only if the state of the Pipeline has changed'  
				echo 'For example, if the Pipeline was previously failing but is now successful'  
					} 
			}  
			
		
	}
