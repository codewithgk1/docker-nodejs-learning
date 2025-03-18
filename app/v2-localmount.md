# Docker Development Setup with Local Code Mounting (v2)

This document explains the development setup using Docker with local code mounting, which enables hot-reloading and faster development cycles.

## Overview

The v2-localmount setup is designed for development environments where you want to:
- Make code changes locally and see them reflected immediately in the container
- Avoid rebuilding the container for every code change
- Maintain isolated node_modules in the container
- Enable automatic application restart on code changes

## Key Features

1. **Local Code Mounting**
   - Your local code directory is mounted directly into the container
   - Changes made locally are immediately visible inside the container
   - No need to rebuild the container for code changes

2. **Hot Reloading with Nodemon**
   - Nodemon is installed globally in the container
   - Automatically restarts the application when file changes are detected
   - Provides instant feedback during development

3. **Isolated Dependencies**
   - Container maintains its own node_modules
   - Prevents conflicts between local and container dependencies
   - Ensures consistent dependency versions in the container

## Setup Instructions

### 1. Build the Docker Image

```bash
docker build -f v2-localmount.dockerfile -t image-v2-localmount .
```

### 2. Run the Container with Volume Mounting

```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd):/usr/src/app \
  -v /usr/src/app/node_modules \
  --name container-v2-localmount \
  image-v2-localmount
```

### Volume Mount Explanation

- `-v $(pwd):/usr/src/app`: Mounts your local directory to the container's working directory
- `-v /usr/src/app/node_modules`: Creates an anonymous volume for container's node_modules

## Development Workflow

1. Start the container using the commands above
2. Make changes to your local code files
3. Changes will be immediately visible in the container
4. Nodemon will automatically restart the application
5. View changes at http://localhost:3000

## Benefits

1. **Faster Development Cycle**
   - No need to rebuild container for code changes
   - Immediate feedback on code modifications
   - Reduced development time

2. **Consistent Environment**
   - Container maintains its own isolated environment
   - Dependencies are managed separately from local machine
   - Ensures consistent behavior across different development machines

3. **Better Developer Experience**
   - Real-time code updates
   - Automatic application restart
   - No manual intervention needed for code changes

## Troubleshooting

If you encounter any issues:

1. **Container not starting**
   - Check if port 3000 is already in use
   - Verify Docker daemon is running
   - Check container logs: `docker logs nodejs-app-dev`

2. **Changes not reflecting**
   - Ensure volume mounting is correct
   - Check if nodemon is running properly
   - Verify file permissions

3. **Dependency issues**
   - Container's node_modules are isolated
   - Local changes to package.json require container rebuild
   - Run `docker-compose down` and rebuild if needed

## Best Practices

1. Always use the provided volume mounting flags
2. Keep the container running during development
3. Use `docker logs` to monitor application behavior
4. Rebuild container only when package.json changes
