# Use an official Node.js image as the base
FROM node:16-alpine

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your app runs on (assuming 3000, adjust if necessary)
EXPOSE 3000

# Command to start the app
CMD ["node", "server.js"]

