# Use the Node.js 18 image
FROM node:14

# Install Supervisor
RUN apt-get update && apt-get install -y supervisor

# Set the working directory for the Node.js application
WORKDIR /API

# Clone the Git repository
RUN git clone --branch v3.1.1 --single-branch https://github.com/FAST-SUSHI-NEXTECH/API.git .

# Remove existing configuration files
RUN rm -f src/dbConnection.js
RUN rm -f src/config.js

# Copy the local configuration files
COPY config.js src/config.js
COPY dbConnection.js src/dbConnection.js

# Install Node.js dependencies
RUN npm install

# Expose port 3000 for Node.js application
EXPOSE 3001

# Set up Supervisor configuration
COPY supervisor.conf /etc/supervisor/conf.d/supervisor-node.conf

# Set up Python web server and copy assets
WORKDIR /
COPY assets /assets

# Expose port 80 for Python web server
EXPOSE 80

# Command to start Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf", "--nodaemon"]