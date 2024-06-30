# Use the official Node.js image as the base image
FROM node:22

# Create and set the working directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies
# RUN npm install

# If you are building your code for production
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Command to run the app
CMD [ "npm", "start" ]
