# Docker Node.js Basic Example (v1)

This guide explains how to build and run a basic Node.js application using Docker. This example demonstrates the fundamental concepts of containerization using Docker.

## Prerequisites

- Docker installed on your machine
- Basic understanding of Docker commands
- Node.js application code in the current directory

## Docker Commands Explained

### 1. Building the Docker Image

```bash

# Build the Docker image
docker build -f v1-basic.dockerfile -t image-v1-basic .
```

This command builds a Docker image with the following components:
- `docker build`: Builds a new image from the Dockerfile
- `-f app/v1-basic.dockerfile`: Specifies the Dockerfile to use
- `-t image-v1-basic`: Tags the image with the name "image-v1-basic"
- `.`: Specifies the build context (current directory)

The build process uses the Dockerfile in the current directory to:
1. Set up the base Node.js environment
2. Copy application files
3. Install dependencies
4. Configure the application

### 2. Running the Container

```bash
docker run -p 3000:3000 --name container-v1-basic -d image-v1-basic
```

This command creates and starts a container with the following options:
- `-p 3000:3000`: Maps port 3000 inside the container to port 3000 on your host machine
- `--name container-v1-basic`: Assigns a name to the container for easy reference
- `-d`: Runs the container in detached mode (in the background)
- `image-v1-basic`: Specifies the image to use for creating the container

## Additional Useful Commands

### View Running Containers
```bash
docker ps
```

### Stop the Container
```bash
docker stop container-v1-basic
```

### Remove the Container
```bash
docker rm container-v1-basic
```

### View Container Logs
```bash
docker logs container-v1-basic
```

### Monitor Container Resources

#### Check CPU and Memory Usage
```bash
# View real-time CPU and memory usage
docker stats container-v1-basic

# View CPU and memory usage in a specific format
docker stats container-v1-basic --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"
```

#### Control Container Resources

You can limit container resources when running it using the following options:

```bash
# Run container with CPU and memory limits
docker run -p 3000:3000 \
  --name container-v1-basic \
  --cpus=1.0 \
  --memory=512m \
  --memory-swap=1g \
  -d image-v1-basic
```

Resource control options explained:
- `--cpus=1.0`: Limits the container to use at most 1 CPU core
- `--memory=512m`: Limits the container's memory usage to 512 megabytes
- `--memory-swap=1g`: Sets the swap limit to 1 gigabyte (swap = memory + swap limit)

You can also update resource limits for a running container:
```bash
# Update CPU and memory limits for a running container
docker update --cpus=2.0 --memory=1g container-v1-basic
```

## Accessing the Application

Once the container is running, you can access the application at:
- http://localhost:3000

## Notes
- The application runs on port 3000 inside the container
- The port is mapped to 3000 on your host machine for access
- The container runs in detached mode, meaning it runs in the background
- Use container logs to debug any issues that may arise