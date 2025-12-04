const express = require('express');
const router = express.Router();

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
router.post('/', async (req, res, next) => {
  try {
    const { BanStage, Character } = req.models;
    const { characterId, stageName, reason, dangerRating } = req.body;

    if (!characterId || !stageName || !reason) {
      return res.status(400).json({
        error: "characterId, stageName, and reason are required"
      });
    }

    // Optional: Check that the character exists
    const character = await Character.findByPk(characterId);
    if (!character) {
      return res.status(400).json({ error: "Character does not exist" });
    }

    const newBanStage = await BanStage.create({
      characterId,
      stageName,
      reason,
      dangerRating
    });

    res.status(201).json(newBanStage);
  } catch (err) {
    next(err);
  }
});

// PUT /ban-stages/:id – update a ban stage
router.put('/:id', async (req, res, next) => {
  try {
    const { BanStage } = req.models;
    const banStage = await BanStage.findByPk(req.params.id);

    if (!banStage) {
      return res.status(404).json({ error: "Ban stage not found" });
    }

    const { stageName, reason, dangerRating } = req.body;

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
router.delete('/:id', async (req, res, next) => {
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
