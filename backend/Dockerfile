# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Kopieren der package.json und package-lock.json
COPY package*.json ./

# Installation der Abhängigkeiten
RUN npm install

# Kopieren des restlichen Quellcodes
COPY . .

# Erstellen des Upload-Verzeichnisses für Bilder
RUN mkdir -p ./public/uploads

# Port freigeben
EXPOSE 3001

# Umgebungsvariable für das Ausführen im Produktionsmodus
ENV NODE_ENV=production

# Starten des Servers mit npm start (verwendet node src/server.js)
CMD ["npm", "run", "start"]