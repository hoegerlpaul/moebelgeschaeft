import mongoose from "mongoose";

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  material: { type: String, required: true },
  color: { type: String, default: "unlackiert" },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true }
  },
  price: { type: Number, required: true },
  stock: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
  configurations: { type: Map, of: String }, // Dynamische Konfigurationen als Key-Value-Paar
  
  // Neues Feld für mehrere Bilder
  images: { type: [String], default: [] }
});

export default mongoose.model("Furniture", furnitureSchema);

