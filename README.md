# Plattform für ein personalisiertes Möbelgeschäft mit MongoDB

Ein Webprojekt mit Next.js-Frontend, Node.js-Backend und MongoDB-Datenbank.

## Voraussetzungen
- Docker Desktop (https://www.docker.com/products/docker-desktop/)
- Im Terminal bei Docker anmelden `docker login <Nutzername>`

## Start
1. Projektverzeichnis entpacken
2. Terminal öffnen und zum Verzeichnis navigieren 
3. `docker-compose up -d --build` ausführen
4. Browser öffnen: http://localhost:3000

## Features
- Möbelübersicht auf der Hauptseite (aus Kundensicht)
- Detailansicht mit Konfigurationsmöglichkeiten
- Speichern eigener Konfigurationen mit N Konifgurationsmöglichkeiten 

## Beenden
`docker-compose down` oder `docker-compose down -v` (löscht auch DB-Daten)

Bei Fragen stehe ich gerne zur Verfügung.