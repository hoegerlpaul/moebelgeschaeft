# Frontend Dockerfile (Entwicklungsmodus)
FROM node:18-alpine

WORKDIR /app

# Kopieren der package.json und package-lock.json
COPY package*.json ./

# Installation der Abhängigkeiten
RUN npm install

# Kopieren des restlichen Quellcodes
COPY . .

# Port freigeben
EXPOSE 3000

# Umgebungsvariable für das Ausführen im Entwicklungsmodus
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Starten der Next.js-Anwendung im Entwicklungsmodus
# Wichtig: Host auf 0.0.0.0 setzen, damit der Server von außerhalb des Containers erreichbar ist
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]