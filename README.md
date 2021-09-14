# netapp 
This App does service registration and show graphs for registered services.

## Run local
In config.js, uncomment the localhost one for running locally
Use command npm start for local run
Please ensure mongodb is installed for local run
Url: http://localhost:8000/

## For docker image
docker build -t net-app .

Above command will build the image
## docker compose
docker ps -a : to check all images(Net App, Monitor App, Monitor Retro App) are present. 
Mongo image will download during run.

docker-compose up : to link all the apps and run
docker-compose up -d : to run in background

Above command will load and start the app.
Please ensure images of net-app,monitor-app, monitor-retro-app are already built before docker compose.

After docker compose verify ${url} from aws or localhost:
 
Net App Url: http://${url}:8000/
Monitor App Url: http://${url}:8001/
Monitor Retro App Url: http://${url}:8002/
