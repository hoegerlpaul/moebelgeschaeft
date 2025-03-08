import Furniture from "../models/Furniture.js";

export default async function furnitureRoutes(fastify, options) {
  // Alle Möbel abrufen
  fastify.get("/furniture", async (req, reply) => {
    try {
      const furnitureList = await Furniture.find();
      return reply.send(furnitureList);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
  
  // Neues Möbelstück hinzufügen
  fastify.post("/furniture", async (req, reply) => {
    try {
      const newFurniture = new Furniture(req.body);
      await newFurniture.save();
      return reply.code(201).send(newFurniture);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });

  // Neues konfiguriertes Möbelstück speichern
  fastify.post("/furniture/custom", async (request, reply) => {
    try {
      const { originalId, name, material, color, dimensions, price, configurations } = request.body;
      
      if (!originalId) {
        return reply.code(400).send({ error: "Original-ID ist erforderlich" });
      }
      
      const originalFurniture = await Furniture.findById(originalId);
      if (!originalFurniture) {
        return reply.status(404).send({ error: "Originalmöbel nicht gefunden" });
      }
      
      const newFurniture = new Furniture({
        originalId,
        name,
        material,
        color,
        dimensions,
        price,
        stock: 1,
        configurations,
      });
      
      await newFurniture.save();
      reply.status(201).send(newFurniture);
    } catch (err) {
      console.error("Fehler beim Speichern als neues Möbelstück:", err);
      reply.status(500).send({ error: err.message || "Fehler beim Speichern" });
    }
  });

  fastify.get("/furniture/custom", async (req, reply) => {
    try {
      const customFurniture = await Furniture.find({ originalId: { $exists: true } });
      return reply.send(customFurniture);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
  
  // Einzelnes Möbelstück abrufen
  fastify.get("/furniture/:id", async (req, reply) => {
    try {
      const furniture = await Furniture.findById(req.params.id);
      if (!furniture) {
        return reply.code(404).send({ error: "Möbelstück nicht gefunden" });
      }
      return reply.send(furniture);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
    
  // Möbelstück aktualisieren
  fastify.patch("/furniture/:id", async (req, reply) => {
    try {
      const updatedFurniture = await Furniture.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
        
      if (!updatedFurniture) {
        return reply.code(404).send({ error: "Möbelstück nicht gefunden" });
      }
        
      return reply.send(updatedFurniture);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
  
 
  
  // Möbelstück löschen
  fastify.delete("/furniture/:id", async (req, reply) => {
    try {
      const deletedFurniture = await Furniture.findByIdAndDelete(req.params.id);
      if (!deletedFurniture) {
        return reply.code(404).send({ error: "Möbelstück nicht gefunden" });
      }
      return reply.send({ message: "Möbelstück gelöscht" });
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
      
  
  
   
  
}



  