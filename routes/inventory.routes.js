import express from "express";
import db from "../config/firebase.js";

const router = express.Router();
const inventoryRef = db.ref("inventory");




/**
 * GET all products
 */
router.get("/", async (req, res) => {
  try {
    const snapshot = await inventoryRef.get();
    res.json(snapshot.val() || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ADD product
 */
router.post("/", async (req, res) => {
  try {
    const newRef = inventoryRef.push();
    const now = new Date().toISOString();

    const data = { ...req.body, createdAt: now, updatedAt: now };

    await newRef.set(data);

    res.status(201).json({ id: newRef.key, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * UPDATE product
 */
router.put("/:id", async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date().toISOString() };

    await inventoryRef.child(req.params.id).update(updates);
    res.json({ id: req.params.id, ...updates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE product
 */
router.delete("/:id", async (req, res) => {
  try {
    await inventoryRef.child(req.params.id).remove();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
