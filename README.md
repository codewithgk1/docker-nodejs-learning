# Docker Node.js Learning Project

This repository contains examples and applications for learning Docker with Node.js. The project includes a lightweight Node.js API and various Docker examples.

## Project Structure

```
docker-nodejs-learning/
├── app/                    # Lightweight Node.js API
│   ├── index.js           # API implementation
│   ├── package.json       # Node.js dependencies
│   └── data.json          # File-based storage
└── examples/              # Docker examples and configurations
    └── v1-basic/         # Basic Docker example
        └── Dockerfile    # Docker configuration
```

## API Application (/app)

A lightweight Node.js API for storing and retrieving names using file-based storage.

### Running with Docker (v1-basic example)

1. Navigate to the v1-basic example directory:
```bash
cd examples/v1-basic
```

2. Build the Docker image:
```bash
docker build -t nodejs-app .
```

3. Run the container:
```bash
docker run -p 3000:3000 nodejs-app
```

The application will be accessible at http://localhost:3000 (port 3000 inside container is mapped to port 3000 on your machine)

### Running Locally (without Docker)

### Requirements

- Node.js version 20 or higher

### Environment Variables

The application uses environment variables for configuration. To set up:

1. Copy the example environment file:
```bash
cp app/.env.example app/.env
```

2. Update the values in `app/.env` with your configuration.

3. When running with Docker, use the `--env-file` flag:
```bash
docker run --env-file ./app/.env -p 3000:3000 nodejs-app
```

### Setup and Running the API

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:

For development (with auto-reload):
```bash
npm run dev
```

For production:
```bash
npm run prod
```

The server will run on http://localhost:3000

### Development Mode

When running in development mode (`npm run dev`):
- The server will automatically restart when you make changes to any `.js` or `.json` files
- You don't need to manually restart the server after code changes
- All changes will be reflected immediately

### API Documentation

The API documentation is available through Swagger UI at http://localhost:3000/api-docs when the server is running.

### API Endpoints

#### GET /names
Retrieves all stored names.

Example:
```bash
curl http://localhost:3000/names
```

#### POST /names
Adds a new name to the storage.

Example:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"John"}' http://localhost:3000/names
```

## Docker Examples (/examples)

The `/examples` directory contains various Docker configurations and examples for learning Docker with Node.js. Each example will include its own documentation and instructions.

More examples will be added as the project grows. 