# Understanding Data Persistence in Docker

## Testing Scenarios

### Without Persistence
- A data.json file exists in the root directory and is updated through POST API calls
- After making three POST API calls and restarting the container, all data is lost
- This demonstrates the temporary nature of container storage

### With Persistence
- By creating and mounting a Docker volume to the container, we can achieve data persistence
- Data remains intact even after container restarts

## Important Notes on Container Restart
When using `docker restart container-v3-learnvolume`, data persists because you're only stopping and starting the same container instance.

However, data will be lost in these scenarios:
1. Removing the container (`docker rm container-v3-learnvolume`)
2. Stopping and creating a new container from the same image
3. Updating the image and creating a new container

This is why Docker volumes are essential for true data persistence:
- Data is stored outside the container in the host system
- Data persists even when removing and recreating containers
- Data can be shared between multiple containers

## Implementation Guide

1. Create a Docker volume:
```bash
docker volume create my-data-volume
```

2. Stop and remove the existing container:
```bash
docker stop container-v3-learnvolume
docker rm container-v3-learnvolume
```

3. Run a new container with the volume mounted:
```bash
docker run -p 3000:3000 \
  --env-file .env \
  --name container-v3-learnvolume \
  -v my-data-volume:/usr/src/app/data \
  -d image-v3-learnvolume
```

4. Testing Persistence:
   - Make several API calls to update data.json
   - Stop the container: `docker stop container-v3-learnvolume`
   - Remove the container: `docker rm container-v3-learnvolume`
   - Create a new container with the same volume:
   ```bash
   docker run -p 3000:3000 \
     --env-file .env \
     --name container-v3-learnvolume \
     -v my-data-volume:/usr/src/app/data \
     -d image-v3-learnvolume
   ```
   - Verify that your data is still available

## Verifying Non-Persistent Storage
To demonstrate how data is lost without volumes:
1. Stop the container: `docker stop container-v3-learnvolume`
2. Remove it: `docker rm container-v3-learnvolume`
3. Create a new container without a volume:
```bash
docker run -p 3000:3000 --env-file .env --name container-v3-learnvolume -d image-v3-learnvolume
```
Note: The data.json file will start fresh as you're working with a new container instance.

## Useful Docker Commands

```bash
# Image Management
docker build -f v3-learnvolume.dockerfile -t image-v3-learnvolume .

# Container Operations
docker run -p 3000:3000 --env-file .env --name container-v3-learnvolume -d image-v3-learnvolume
docker restart container-v3-learnvolume
docker stop container-v3-learnvolume
docker rm container-v3-learnvolume

# Container Listing
docker ps          # List running containers
docker ps -a       # List all containers (including stopped ones)

# Volume Management
docker volume create my-data-volume
docker volume ls
docker volume inspect my-data-volume
```

