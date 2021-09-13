# netapp

## Run local
In config.js, uncomment the localhost one for running locally

## for docker image
docker build -t net-app .


Above command will load and start the app.
Please ensure images of net-app,monitor-app, monitor-retro-app are already built before docker compose.

## docker compose
docker-compose up

Please ensure mongodb is installed for local run