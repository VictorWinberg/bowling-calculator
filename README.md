# GetAccept Bowling Score Calculator 

## Technologies

Bowling Score Calculator is built with:

- Docker
- Makefile
- Node.js 14 w/ express

## Running with Docker (recommended)

> Using a Makefile (if you don't have Make install, install it or run the commands inside the `Makefile`)

### Setup

### First time

If you are running builds for the first time, you need to create the network defined in the docker-compose file. Run the following command:

```bash
docker network create getaccept_default
```

### Running locally in development

```
make up
```

### Running locally in production

```
make up-prod
```

### Stop running container

```
make down
```

### Remove container

```
make rm
```

## Running without Docker

### Setup

- Install Node v14 (recommended using NVM)

- Install dependencies:

        npm install

### Running locally in development

- Run the program

        npm run dev

### Running locally in production

1.  Build the program

        npm run build

2.  Run the built program

        node ./build/app.js
