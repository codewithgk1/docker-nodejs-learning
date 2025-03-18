# Use Node.js 20 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY ../../package.json ../../package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY ../../index.js ../../data.json ./
COPY ../../node_modules ./node_modules

# Expose port 3000 (assuming the default Express.js port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]