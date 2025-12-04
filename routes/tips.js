const express = require('express');
const router = express.Router();

// GET /tips – get all tips
router.get('/', async (req, res, next) => {
  try {
    const { Tip, Character } = req.models;
    const tips = await Tip.findAll({ include: Character });
    res.json(tips);
  } catch (err) {
    next(err);
  }
});

// GET /tips/:id – get a single tip by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { Tip, Character } = req.models;
    const tip = await Tip.findByPk(req.params.id, { include: Character });

    if (!tip) {
      return res.status(404).json({ error: "Tip not found" });
    }

    res.json(tip);
  } catch (err) {
    next(err);
  }
});

// POST /tips – create a new tip
router.post('/', async (req, res, next) => {
  try {
    const { Tip, Character } = req.models;
    const { characterId, tipTitle, description, difficultyLevel } = req.body;

    if (!characterId || !tipTitle || !description) {
      return res.status(400).json({
        error: "characterId, tipTitle, and description are required"
      });
    }

    const character = await Character.findByPk(characterId);
    if (!character) {
      return res.status(400).json({ error: "Character does not exist" });
    }

    const newTip = await Tip.create({
      characterId,
      tipTitle,
      description,
      difficultyLevel
    });

    res.status(201).json(newTip);
  } catch (err) {
    next(err);
  }
});

// PUT /tips/:id – update a tip
router.put('/:id', async (req, res, next) => {
  try {
    const { Tip } = req.models;
    const tip = await Tip.findByPk(req.params.id);

    if (!tip) {
      return res.status(404).json({ error: "Tip not found" });
    }

    const { tipTitle, description, difficultyLevel } = req.body;

    await tip.update({
      tipTitle: tipTitle ?? tip.tipTitle,
      description: description ?? tip.description,
      difficultyLevel: difficultyLevel ?? tip.difficultyLevel
    });

    res.json(tip);
  } catch (err) {
    next(err);
  }
});

// DELETE /tips/:id – delete a tip
router.delete('/:id', async (req, res, next) => {
  try {
    const { Tip } = req.models;
    const tip = await Tip.findByPk(req.params.id);

    if (!tip) {
      return res.status(404).json({ error: "Tip not found" });
    }

    await tip.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
