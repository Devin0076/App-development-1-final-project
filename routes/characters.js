// Routes for managing characters and their matchup data

const express = require('express');
const router = express.Router();

// GET /characters – get all characters
router.get('/', async (req, res, next) => {
  try {
    const { Character } = req.models;
    const characters = await Character.findAll();
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

// GET /characters/:id – get full character info including stages and tips
router.get('/:id', async (req, res, next) => {
  try {
    const { Character, BanStage, CounterpickStage, Tip } = req.models;

    const character = await Character.findByPk(req.params.id, {
      include: [
        { model: BanStage },
        { model: CounterpickStage },
        { model: Tip }
      ]
    });

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.json(character);
  } catch (err) {
    next(err);
  }
});


// POST /characters – create new character
router.post('/', async (req, res, next) => {
  try {
    const { Character } = req.models;
    const { name, archetype, weightClass } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: "Name is required and must be a non-empty string" });
    }

    const newCharacter = await Character.create({
      name,
      archetype,
      weightClass
    });

    res.status(201).json(newCharacter);
  } catch (err) {
    next(err);
  }
});

// PUT /characters/:id – update character
router.put('/:id', async (req, res, next) => {
  try {
    const { Character } = req.models;
    const character = await Character.findByPk(req.params.id);

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    const { name, archetype, weightClass } = req.body;

    if (name !== undefined) {
      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: "Name must be a non-empty string when provided" });
      }
    }

    await character.update({ name, archetype, weightClass });

    res.json(character);
  } catch (err) {
    next(err);
  }
});

// DELETE /characters/:id – delete character
router.delete('/:id', async (req, res, next) => {
  try {
    const { Character } = req.models;
    const character = await Character.findByPk(req.params.id);

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    await character.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
