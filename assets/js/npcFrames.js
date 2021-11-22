export const npcFrames = {};

export const warriorNpc = {
  meta: {
    sprite_config: {
      x: 700,
      y: 182,
    },
  },
  config: {
    warrior_idle: {
      fromSingles: false,
      settings: {
        key: "war_npc_idle",
        frameRate: 8,
        repeat: -1,
      },
      sprites: {
        warrior_npc_idle: "warrior1/Idle.png",
      },
      sprite_dimensions: {
        frameWidth: 184,
        frameHeight: 137,
      },
    },
  },
};
