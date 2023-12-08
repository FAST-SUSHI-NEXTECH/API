# Utilisez une image de base Node.js
FROM node:18

# Créez et définissez le répertoire de travail dans le conteneur
WORKDIR /API

# Clone the Git repository (replace <repository-url> with your actual repository URL)
RUN git clone --branch v2.4 --single-branch https://github.com/FAST-SUSHI-NEXTECH/API.git .

# Delete the /src/dbConnection.js file
RUN rm -f src/dbConnection.js

# Delete the /src/dbConnection.js file
RUN rm -f src/config.js

# Copy the local config.js & dbConnection.js file to the same location
COPY config.js src/config.js
COPY dbConnection.js src/dbConnection.js

# Installez les dépendances du projet
RUN npm install

# Exposez le port sur lequel votre application Express s'exécute
EXPOSE 3000

# Command to start your application
CMD [ "npm", "start" ]