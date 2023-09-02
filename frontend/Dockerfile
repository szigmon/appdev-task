# Use an official Node runtime as the base image
FROM node:14

# Create a non-root user
RUN useradd -m myuser

# Set the working directory
WORKDIR /usr/src/app

# Change ownership of the working directory
RUN chown myuser:myuser /usr/src/app

# Switch to the non-root user
USER myuser

# Install app dependencies
COPY --chown=myuser:myuser package*.json ./
RUN npm install

# Bundle app source
COPY --chown=myuser:myuser . .

# Run the application
CMD ["npm", "start"]
