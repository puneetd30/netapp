# netapp 
This App does service registration and show graphs for registered services.

## Run local
In config.js, uncomment the localhost one for running locally
Use command npm start for local run
Please ensure mongodb is installed for local run

## for docker image
docker build -t net-app .

Above command will build the image
## docker compose
docker-compose up : to link all the apps and run
docker-compose up -d : to run in background

Above command will load and start the app.
Please ensure images of net-app,monitor-app, monitor-retro-app are already built before docker compose.


