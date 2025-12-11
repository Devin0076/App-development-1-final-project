// Routes for managing ban stages and their associations with characters

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');


// GET /ban-stages – get all ban stages
router.get('/', async (req, res, next) => {
  try {
    const { BanStage, Character } = req.models;
    const banStages = await BanStage.findAll({ include: Character });
    res.json(banStages);
  } catch (err) {
    next(err);
  }
});

// GET /ban-stages/:id – get a single ban stage by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { BanStage, Character } = req.models;
    const banStage = await BanStage.findByPk(req.params.id, { include: Character });

    if (!banStage) {
      return res.status(404).json({ error: "Ban stage not found" });
    }

    res.json(banStage);
  } catch (err) {
    next(err);
  }
});

// POST /ban-stages – create a new ban stage
router.post('/', authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const { BanStage, Character } = req.models;
    const { characterId, stageName, reason, dangerRating } = req.body;

    if (!characterId) {
      return res.status(400).json({ error: "characterId is required" });
    }

    if (!stageName || typeof stageName !== 'string' || !stageName.trim()) {
      return res.status(400).json({ error: "stageName is required and must be a non-empty string" });
    }

    if (!reason || typeof reason !== 'string' || !reason.trim()) {
      return res.status(400).json({ error: "reason is required and must be a non-empty string" });
    }

    if (dangerRating !== undefined) {
      const dr = Number(dangerRating);
      if (!Number.isInteger(dr) || dr < 1 || dr > 5) {
        return res.status(400).json({ error: "dangerRating must be an integer between 1 and 5" });
      }
    }

    const character = await Character.findByPk(characterId);
    if (!character) {
      return res.status(400).json({ error: "Character does not exist" });
    }

    const newBanStage = await BanStage.create({
      characterId,
      stageName: stageName.trim(),
      reason: reason.trim(),
      dangerRating
    });

    res.status(201).json(newBanStage);
  } catch (err) {
    next(err);
  }
});


// PUT /ban-stages/:id – update a ban stage
router.put('/:id', authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const { BanStage } = req.models;
    const banStage = await BanStage.findByPk(req.params.id);

    if (!banStage) {
      return res.status(404).json({ error: "Ban stage not found" });
    }

    let { stageName, reason, dangerRating } = req.body;

    if (stageName !== undefined) {
      if (typeof stageName !== 'string' || !stageName.trim()) {
        return res.status(400).json({ error: "stageName must be a non-empty string when provided" });
      }
      stageName = stageName.trim();
    }

    if (reason !== undefined) {
      if (typeof reason !== 'string' || !reason.trim()) {
        return res.status(400).json({ error: "reason must be a non-empty string when provided" });
      }
      reason = reason.trim();
    }

    if (dangerRating !== undefined) {
      const dr = Number(dangerRating);
      if (!Number.isInteger(dr) || dr < 1 || dr > 5) {
        return res.status(400).json({ error: "dangerRating must be an integer between 1 and 5 when provided" });
      }
    }

    await banStage.update({
      stageName: stageName ?? banStage.stageName,
      reason: reason ?? banStage.reason,
      dangerRating: dangerRating ?? banStage.dangerRating
    });

    res.json(banStage);
  } catch (err) {
    next(err);
  }
});


// DELETE /ban-stages/:id – delete a ban stage
router.delete('/:id', authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const { BanStage } = req.models;
    const banStage = await BanStage.findByPk(req.params.id);

    if (!banStage) {
      return res.status(404).json({ error: "Ban stage not found" });
    }

    await banStage.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
