export const playerAnimationsConfig = {
  meta: {
    sprite_id: "player_sprite",
    sprite_config: {
      x: 280,
      y: 200,
    },
    handlers: {
      click: {
        defensive_stance: {
          ui_css_id: "def_stance",
          animation: "player_block_idle",
          element: {},
        },
        block: {
          ui_css_id: "block",
          animation: "player_block",
        },
        attack1: {
          ui_css_id: "attack1",
          animation: "player_attack_1",
          element: {
            type: "button",
            attributes: {
              id: "attack1",
              class: "rpgui-button",
            },
            content: "Strike",
            // children: [
            //   {
            //     type: "div",
            //     attributes: {
            //       class: "rpgui-icon sword",
            //     },
            //   },
            // ],
          },
        },
        attack2: {
          ui_css_id: "attack2",
          animation: "player_attack_2",
        },
        attack3: {
          ui_css_id: "attack3",
          animation: "player_attack_3",
        },
      },
    },
  },
  config: {
    idle: {
      fromSingles: true,
      settings: {
        key: "player_idle",
        frameRate: 8,
        repeat: -1,
      },
      sprites: {
        plr_idle_0: "player/Idle/HeroKnight_Idle_0.png",
        plr_idle_1: "player/Idle/HeroKnight_Idle_1.png",
        plr_idle_2: "player/Idle/HeroKnight_Idle_2.png",
        plr_idle_3: "player/Idle/HeroKnight_Idle_3.png",
        plr_idle_4: "player/Idle/HeroKnight_Idle_4.png",
        plr_idle_5: "player/Idle/HeroKnight_Idle_5.png",
        plr_idle_6: "player/Idle/HeroKnight_Idle_6.png",
        plr_idle_7: "player/Idle/HeroKnight_Idle_7.png",
      },
    },
    block_idle: {
      fromSingles: true,
      settings: {
        key: "player_block_idle",
        frameRate: 10,
      },
      sprites: {
        plr_block_idle_0: "player/BlockIdle/HeroKnight_Block_Idle_0.png",
        plr_block_idle_1: "player/BlockIdle/HeroKnight_Block_Idle_1.png",
        plr_block_idle_2: "player/BlockIdle/HeroKnight_Block_Idle_2.png",
        plr_block_idle_3: "player/BlockIdle/HeroKnight_Block_Idle_3.png",
        plr_block_idle_4: "player/BlockIdle/HeroKnight_Block_Idle_4.png",
        plr_block_idle_5: "player/BlockIdle/HeroKnight_Block_Idle_5.png",
        plr_block_idle_6: "player/BlockIdle/HeroKnight_Block_Idle_6.png",
        plr_block_idle_7: "player/BlockIdle/HeroKnight_Block_Idle_7.png",
      },
    },
    block: {
      fromSingles: true,
      settings: {
        key: "player_block",
        frameRate: 10,
      },
      sprites: {
        plr_block_0: "player/Block/HeroKnight_Block_0.png",
        plr_block_1: "player/Block/HeroKnight_Block_1.png",
        plr_block_2: "player/Block/HeroKnight_Block_2.png",
        plr_block_3: "player/Block/HeroKnight_Block_3.png",
        plr_block_4: "player/Block/HeroKnight_Block_4.png",
      },
    },
    run: {
      fromSingles: true,
      settings: {
        key: "player_run",
        frameRate: 13,
        repeat: -1,
      },
      settings: {
        plr_run_0: "player/Run/HeroKnight_Run_0.png",
        plr_run_1: "player/Run/HeroKnight_Run_1.png",
        plr_run_2: "player/Run/HeroKnight_Run_2.png",
        plr_run_3: "player/Run/HeroKnight_Run_3.png",
        plr_run_4: "player/Run/HeroKnight_Run_4.png",
        plr_run_5: "player/Run/HeroKnight_Run_5.png",
        plr_run_6: "player/Run/HeroKnight_Run_6.png",
        plr_run_7: "player/Run/HeroKnight_Run_7.png",
        plr_run_8: "player/Run/HeroKnight_Run_8.png",
        plr_run_9: "player/Run/HeroKnight_Run_9.png",
      },
    },
    attack1: {
      fromSingles: true,
      settings: {
        key: "player_attack_1",
        frameRate: 10,
      },
      sprites: {
        plr_att1_0: "player/Attack1/HeroKnight_Attack1_0.png",
        plr_att1_1: "player/Attack1/HeroKnight_Attack1_1.png",
        plr_att1_2: "player/Attack1/HeroKnight_Attack1_2.png",
        plr_att1_3: "player/Attack1/HeroKnight_Attack1_3.png",
        plr_att1_4: "player/Attack1/HeroKnight_Attack1_4.png",
        plr_att1_5: "player/Attack1/HeroKnight_Attack1_5.png",
      },
    },
    attack2: {
      fromSingles: true,
      settings: {
        key: "player_attack_2",
        frameRate: 10,
      },
      sprites: {
        plr_att2_0: "player/Attack2/HeroKnight_Attack2_0.png",
        plr_att2_1: "player/Attack2/HeroKnight_Attack2_1.png",
        plr_att2_2: "player/Attack2/HeroKnight_Attack2_2.png",
        plr_att2_3: "player/Attack2/HeroKnight_Attack2_3.png",
        plr_att2_4: "player/Attack2/HeroKnight_Attack2_4.png",
        plr_att2_5: "player/Attack2/HeroKnight_Attack2_5.png",
      },
    },
    attack3: {
      fromSingles: true,
      settings: {
        key: "player_attack_3",
        frameRate: 12,
      },
      sprites: {
        plr_att3_0: "player/Attack3/HeroKnight_Attack3_0.png",
        plr_att3_1: "player/Attack3/HeroKnight_Attack3_1.png",
        plr_att3_2: "player/Attack3/HeroKnight_Attack3_2.png",
        plr_att3_3: "player/Attack3/HeroKnight_Attack3_3.png",
        plr_att3_4: "player/Attack3/HeroKnight_Attack3_4.png",
        plr_att3_5: "player/Attack3/HeroKnight_Attack3_5.png",
        plr_att3_6: "player/Attack3/HeroKnight_Attack3_6.png",
        plr_att3_7: "player/Attack3/HeroKnight_Attack3_7.png",
      },
    },
  },
};
