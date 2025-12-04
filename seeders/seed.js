const sequelize = require('../config/database');
const initModels = require('../models');

const seed = async () => {
  try {
    const models = initModels(sequelize);
    const { Character, BanStage, CounterpickStage, Tip } = models;

    // Reset tables for a fresh start
    await sequelize.sync({ force: true });

    // Characters
    const pit = await Character.create({
      name: 'Pit',
      archetype: 'all-rounder',
      weightClass: 'midweight'
    });

    const darkPit = await Character.create({
      name: 'Dark Pit',
      archetype: 'all-rounder',
      weightClass: 'midweight'
    });

    const sonic = await Character.create({
      name: 'Sonic',
      archetype: 'rushdown',
      weightClass: 'light'
    });

    // Ban stages
    await BanStage.bulkCreate([
      {
        characterId: sonic.id,
        stageName: 'Final Destination',
        reason: 'Flat stage gives Sonic a lot of runway to camp and whiff punish.',
        dangerRating: 5
      },
      {
        characterId: sonic.id,
        stageName: 'Town and City',
        reason: 'Big blast zones let Sonic live longer and still camp platforms.',
        dangerRating: 4
      }
    ]);

    // Counterpick stages
    await CounterpickStage.bulkCreate([
      {
        characterId: sonic.id,
        stageName: 'Smashville',
        benefit: 'Smaller stage forces Sonic to fight instead of running away.',
        rating: 4
      },
      {
        characterId: pit.id,
        stageName: 'Battlefield',
        benefit: 'Pit gets good platform extensions and juggling opportunities.',
        rating: 4
      }
    ]);

    // Tips
    await Tip.bulkCreate([
      {
        characterId: sonic.id,
        tipTitle: 'Shield spin dash',
        description: 'Shield spin dash then punish Sonic’s landing or grab whiff.',
        difficultyLevel: 'hard'
      },
      {
        characterId: darkPit.id,
        tipTitle: 'Use arrows to force movement',
        description: 'Charge arrows to force approaches and catch jumps from midrange.',
        difficultyLevel: 'medium'
      }
    ]);

    console.log('Seed complete');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    process.exit();
  }
};

if (require.main === module) {
  seed();
}

module.exports = seed;
