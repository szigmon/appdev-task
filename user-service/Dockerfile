# Use Red Hat Universal Base Image (UBI)
FROM registry.access.redhat.com/ubi8/nodejs-14

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3002

# Command to run the application
CMD [ "npm", "start" ]
