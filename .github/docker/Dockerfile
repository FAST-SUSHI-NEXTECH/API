# Utilisez une image de base Node.js
FROM node:14

# Créez et définissez le répertoire de travail dans le conteneur
WORKDIR /API

# Clone the Git repository (replace <repository-url> with your actual repository URL)
RUN git clone --branch v2.1 --single-branch https://github.com/FAST-SUSHI-NEXTECH/API.git .

# Delete the /src/dbConnection.js file
RUN rm -f src/dbConnection.js

# Copy the local dbConnection.js file to the same location
COPY dbConnection.js src/dbConnection.js

# Installez les dépendances du projet
RUN npm install

# Exposez le port sur lequel votre application Express s'exécute
EXPOSE 3000

# Command to start your application
CMD [ "npm", "start" ]
