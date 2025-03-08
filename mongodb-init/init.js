// Verbindung zur moebelDB-Datenbank herstellen

// Warum funktioniert das nicht ? 
db = db.getSiblingDB('moebelDB');

// Möbel-Sammlung mit 10 Produkten befüllen
db.furnitures.insertMany([
  {
    name: "Eleganter Esstisch",
    material: "Eichenholz",
    color: "Natur",
    dimensions: { width: 180, height: 75, depth: 90 },
    price: 799.99,
    stock: 5,
    images: [],
    createdAt: new Date()
  },
  {
    name: "Moderner Sessel",
    material: "Leder",
    color: "Schwarz",
    dimensions: { width: 80, height: 90, depth: 85 },
    price: 499.99,
    stock: 8,
    images: [],
    createdAt: new Date()
  },
  {
    name: "Minimalistische Kommode",
    material: "Massivholz",
    color: "Weiß",
    dimensions: { width: 120, height: 80, depth: 45 },
    price: 649.99,
    stock: 3,
    images: [],
    createdAt: new Date()
  },
  {
    name: "Designer Couchtisch",
    material: "Glas",
    color: "Transparent",
    dimensions: { width: 110, height: 45, depth: 60 },
    price: 349.99,
    stock: 10,
    images: [],
    createdAt: new Date()
  },
  {
    name: "Bücherregal XXL",
    material: "Buchenholz",
    color: "Kirsche",
    dimensions: { width: 200, height: 220, depth: 40 },
    price: 899.99,
    stock: 2,
    images: [],
    createdAt: new Date()
  },
  {
    name: "Schlafsofa Deluxe",
    material: "Stoff",
    color: "Grau",
    dimensions: { width: 220, height: 85, depth: 95 },
    price: 1299.99,
    stock: 4,
    images: [],
    createdAt: new Date()
  },
  {
    name: "Ergonomischer Bürostuhl",
    material: "Kunststoff",
    color: "Schwarz",
    dimensions: { width: 65, height: 120, depth: 65 },
    price: 249.99,
    stock: 15,
    images: [],
    createdAt: new Date()
  },
  {
    name: "Vintage Stehlampe",
    material: "Metall",
    color: "Messing",
    dimensions: { width: 40, height: 165, depth: 40 },
    price: 179.99,
    stock: 7,
    images: [],
    createdAt: new Date()
  },
  {
    name: "TV-Lowboard mit Glasfront",
    material: "MDF",
    color: "Nussbaum",
    dimensions: { width: 180, height: 45, depth: 50 },
    price: 429.99,
    stock: 6,
    images: [],
    createdAt: new Date()
  },
  {
    name: "Eckschreibtisch mit Ablage",
    material: "Spanplatte",
    color: "Eiche",
    dimensions: { width: 150, height: 75, depth: 150 },
    price: 349.99,
    stock: 9,
    images: [],
    createdAt: new Date()
  }
]);

// Benutzer-Sammlung mit 2 Benutzern befüllen
db.users.insertMany([
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In einer realen Anwendung solltest du das Passwort hashen!
    role: "admin",
    createdAt: new Date()
  },
  {
    name: "Test User",
    email: "user@example.com",
    password: "user123", // In einer realen Anwendung solltest du das Passwort hashen!
    role: "user",
    createdAt: new Date()
  }
]);

print("✅ Beispieldaten erfolgreich geladen: 10 Möbelstücke und 2 Benutzer!");