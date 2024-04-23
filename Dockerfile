# Use a base image with Node.js
FROM node:20.10

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Command to run the application
ENTRYPOINT ["node", "src/index.js"]