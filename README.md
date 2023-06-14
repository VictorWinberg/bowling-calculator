# Bowling Score Calculator 

## Technologies

Bowling Score Calculator is built with:

- Docker
- Makefile
- Node.js 14 w/ express

## Running with Docker (recommended)

> Using a Makefile (if you don't have Make install, install it or run the commands inside the `Makefile`)

### Setup

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
