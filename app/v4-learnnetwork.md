docker build -f v4-learnnetwork.dockerfile -t image-v4-learnnetwork .
docker run -p 3000:3000 --env-file .env --name container-v4-learnnetwork -d image-v4-learnnetwork

# Learn Docker Networking

## Initial Setup and Container Creation

1. Build the Docker image:
```bash
docker build -f v4-learnnetwork.dockerfile -t image-v4-learnnetwork .
```

2. Run the first container:
```bash
docker run -p 3000:3000 --env-file .env --name container-v4-learnnetwork -d image-v4-learnnetwork
```

## Network Inspection Commands

### Check Docker Networks
```bash
# List all Docker networks
docker network ls

# Inspect the default bridge network
docker network inspect bridge
```

### Container Network Information
```bash
# Check container IP address
docker inspect container-v4-learnnetwork | grep IPAddress

# Check container port mapping
docker port container-v4-learnnetwork

# Check container logs
docker logs container-v4-learnnetwork

# Check container status
docker ps -a | grep container-v4-learnnetwork

# Check container metrics
docker stats container-v4-learnnetwork

# Check container events
docker events --filter container=container-v4-learnnetwork
```

## Testing Network Connectivity

### Create a Second Container
```bash
# Run a second container (using a simple nginx image for testing)
docker run -d --name container-v4-test alpine sleep infinity
```

### Network Connectivity Tests

1. From the second container to the first container:
```bash
# Get the IP address of the first container
docker inspect container-v4-learnnetwork | grep IPAddress

# Execute ping from the second container
docker exec container-v4-test ping <first-container-ip>
```

2. From host machine to containers:
```bash
# Ping the first container
ping <first-container-ip>

# Ping the second container
docker inspect container-v4-test | grep IPAddress
ping <second-container-ip>
```

### Container Monitoring

After performing network tests, monitor the containers:

```bash
# Check logs for both containers
docker logs container-v4-learnnetwork
docker logs container-v4-test

# Check status of both containers
docker ps -a | grep container-v4

# Monitor container metrics
docker stats container-v4-learnnetwork container-v4-test

# Check container events
docker events --filter container=container-v4-learnnetwork
docker events --filter container=container-v4-test
```

## Cleanup

After testing, you can clean up the containers:

```bash
# Stop the containers
docker stop container-v4-learnnetwork container-v4-test

# Remove the containers
docker rm container-v4-learnnetwork container-v4-test
```

## Notes
- Replace `<first-container-ip>` and `<second-container-ip>` with actual IP addresses from the `docker inspect` commands
- The containers will be on the default bridge network unless specified otherwise
- Port 3000 is exposed for the first container, making it accessible from the host machine
- The nginx container is used as a second container for testing purposes
