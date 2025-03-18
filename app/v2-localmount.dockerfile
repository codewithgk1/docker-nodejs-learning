# Use Node.js 20 as the base image
FROM node:20-alpine

# Install nodemon globally for development
RUN npm install -g nodemon

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY ../../package.json ../../package-lock.json ./

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Start the application with nodemon for development
CMD ["nodemon", "index.js"]
