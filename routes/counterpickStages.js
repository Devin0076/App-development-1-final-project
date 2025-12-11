// Routes for managing counterpick stages and their associations with characters

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');


// GET /counterpick-stages – get all counterpick stages
router.get('/', async (req, res, next) => {
  try {
    const { CounterpickStage, Character } = req.models;
    const stages = await CounterpickStage.findAll({ include: Character });
    res.json(stages);
  } catch (err) {
    next(err);
  }
});

// GET /counterpick-stages/:id – get a single counterpick stage
router.get('/:id', async (req, res, next) => {
  try {
    const { CounterpickStage, Character } = req.models;
    const stage = await CounterpickStage.findByPk(req.params.id, { include: Character });

    if (!stage) {
      return res.status(404).json({ error: "Counterpick stage not found" });
    }

    res.json(stage);
  } catch (err) {
    next(err);
  }
});

// POST /counterpick-stages – create a new counterpick stage
router.post('/', authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const { CounterpickStage, Character } = req.models;
    const { characterId, stageName, benefit, rating } = req.body;

    if (!characterId) {
      return res.status(400).json({ error: "characterId is required" });
    }

    if (!stageName || typeof stageName !== 'string' || !stageName.trim()) {
      return res.status(400).json({ error: "stageName is required and must be a non-empty string" });
    }

    if (!benefit || typeof benefit !== 'string' || !benefit.trim()) {
      return res.status(400).json({ error: "benefit is required and must be a non-empty string" });
    }

    if (rating !== undefined) {
      const r = Number(rating);
      if (!Number.isInteger(r) || r < 1 || r > 5) {
        return res.status(400).json({ error: "rating must be an integer between 1 and 5" });
      }
    }

    const character = await Character.findByPk(characterId);
    if (!character) {
      return res.status(400).json({ error: "Character does not exist" });
    }

    const newStage = await CounterpickStage.create({
      characterId,
      stageName: stageName.trim(),
      benefit: benefit.trim(),
      rating
    });

    res.status(201).json(newStage);
  } catch (err) {
    next(err);
  }
});


// PUT /counterpick-stages/:id – update a counterpick stage
router.put('/:id', authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const { CounterpickStage } = req.models;
    const stage = await CounterpickStage.findByPk(req.params.id);

    if (!stage) {
      return res.status(404).json({ error: "Counterpick stage not found" });
    }

    let { stageName, benefit, rating } = req.body;

    if (stageName !== undefined) {
      if (typeof stageName !== 'string' || !stageName.trim()) {
        return res.status(400).json({ error: "stageName must be a non-empty string when provided" });
      }
      stageName = stageName.trim();
    }

    if (benefit !== undefined) {
      if (typeof benefit !== 'string' || !benefit.trim()) {
        return res.status(400).json({ error: "benefit must be a non-empty string when provided" });
      }
      benefit = benefit.trim();
    }

    if (rating !== undefined) {
      const r = Number(rating);
      if (!Number.isInteger(r) || r < 1 || r > 5) {
        return res.status(400).json({ error: "rating must be an integer between 1 and 5 when provided" });
      }
    }

    await stage.update({
      stageName: stageName ?? stage.stageName,
      benefit: benefit ?? stage.benefit,
      rating: rating ?? stage.rating
    });

    res.json(stage);
  } catch (err) {
    next(err);
  }
});


// DELETE /counterpick-stages/:id – delete a counterpick stage
router.delete('/:id', authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const { CounterpickStage } = req.models;
    const stage = await CounterpickStage.findByPk(req.params.id);

    if (!stage) {
      return res.status(404).json({ error: "Counterpick stage not found" });
    }

    await stage.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
