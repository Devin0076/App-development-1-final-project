// Routes for managing counterpick stages and their associations with characters

const express = require('express');
const router = express.Router();

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
router.post('/', async (req, res, next) => {
  try {
    const { CounterpickStage, Character } = req.models;
    const { characterId, stageName, benefit, rating } = req.body;

    if (!characterId || !stageName || !benefit) {
      return res.status(400).json({
        error: "characterId, stageName, and benefit are required"
      });
    }

    const character = await Character.findByPk(characterId);
    if (!character) {
      return res.status(400).json({ error: "Character does not exist" });
    }

    const newStage = await CounterpickStage.create({
      characterId,
      stageName,
      benefit,
      rating
    });

    res.status(201).json(newStage);
  } catch (err) {
    next(err);
  }
});

// PUT /counterpick-stages/:id – update a counterpick stage
router.put('/:id', async (req, res, next) => {
  try {
    const { CounterpickStage } = req.models;
    const stage = await CounterpickStage.findByPk(req.params.id);

    if (!stage) {
      return res.status(404).json({ error: "Counterpick stage not found" });
    }

    const { stageName, benefit, rating } = req.body;

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
router.delete('/:id', async (req, res, next) => {
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
