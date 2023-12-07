# Use the Node.js 18 image
FROM node:18

# Set the working directory
WORKDIR /app

# Clone the project from GitHub with a specific tag
RUN git clone --branch v3.0 --single-branch https://github.com/FAST-SUSHI-NEXTECH/API.git .

# Remove the existing dbConnection.js file
RUN rm -f /app/src/dbConnection.js

# Copy the local dbConnection.js file to the Docker image
COPY ./dbConnection.js /app/src/

# Install dependencies
RUN npm install

# Expose the port your application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]