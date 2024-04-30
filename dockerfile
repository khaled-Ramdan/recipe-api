# Use a Node.js base image
FROM node:15

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run your application
CMD ["npm", "start"]


#      build: docker build -t recipe-api .
#      Run:  docker run -p 5000:5000 recipe-api
#      Stop: 
#            docker ps 
#            docker stop <container-id>
#