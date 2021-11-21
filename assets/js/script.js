import { playerAnimations } from "./playerFrames.js";
import { warriorNpc } from "./npcFrames.js";
import Assistant from "./Assistant.js";
import Character from "./Character.js";
import PlayerUi from "./PlayerUi.js";

/**
 * ==============
 * GAME CLASS   |
 * ==============
 */
class Morokh extends Phaser.Scene {
  constructor() {
    super();
    this.characterAssetPath = "assets/img/characters/";
    this.bgAssetPath = "assets/img/bg/";
    this.assistant = new Assistant();
    this.playerIsRunning = false;
    this.playerIsDefensive = false;
    this.playerIsBusy = false; // Blocking, Attacking, Dead
    this.animationObjects = [playerAnimations];
    this.composedAnimations = [];
    this.animationNames;
    this.playerScale = 3.5;
    this.playerId = "player";
  }

  createAnimations() {
    this.animationObjects.forEach((animationConfig) => {
      this.composedAnimations.push(
        this.assistant.createAnimations(this.anims, animationConfig)
      );
    });

    this.animationMeta = this.assistant.getAnimationNames;
  }

  initEventListeners() {
    this.animationMeta.forEach((anim) => {
      if (anim.ui) {
        document.getElementById(anim.ui).addEventListener("click", () => {
          if (!this.playerIsBusy) {
            this.playerIsBusy = anim.busy;
            this.player.play(anim.key, true);
          }

          if (anim.defensive) this.playerIsDefensive = !this.playerIsDefensive;
        });
      }
    });
  }

  preload() {
    this.load.image("bg", `${this.bgAssetPath}battleback1-1k.png`);

    for (const animation in playerAnimations) {
      for (const value in playerAnimations[animation].sprites) {
        this.load.image(
          value,
          `${this.characterAssetPath}${playerAnimations[animation].sprites[value]}`
        );
      }
    }

    this.load.spritesheet(
      "warrior_npc_idle",
      `${this.characterAssetPath}warrior1/Idle.png`,
      {
        frameWidth: 184,
        frameHeight: 137,
      }
    );
  }

  create() {
    // Initialize Hud elements
    new PlayerUi().build(document.getElementById("hud"));

    // Create Animation configs
    this.createAnimations();
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    this.anims.create({
      key: "e_idle",
      frames: this.anims.generateFrameNumbers("warrior_npc_idle"),
      frameRate: 8,
      repeat: -1,
    });

    // Add player sprite
    this.player = this.add.sprite(280, 200, this.playerId);
    this.player.setScale(this.playerScale);

    this.npcWarrior = this.add.sprite(700, 182, "npcWarrior");

    this.player.on(
      "animationcomplete",
      () => {
        this.playerIsBusy = false;
        this.playerIsRunning = false;
      },
      this
    );

    this.initEventListeners();
    this.npcWarrior.flipX = true;
    this.npcWarrior.setScale(1.9);
    this.npcWarrior.play("e_idle", true);

    // Initiate the keys we will use
    this.keys = this.input.keyboard.addKeys("RIGHT,LEFT,Z", true);
  }

  update() {
    // PLayer Specific
    if (this.keys.RIGHT.isUp) this.playerIsRunning = false;
    if (!this.playerIsRunning && !this.playerIsBusy) {
      if (!this.playerIsDefensive) {
        this.player.play("player_idle", true);
      } else {
        this.player.play("player_block_idle", true);
      }
    }

    this.animationMeta.forEach((anim) => {
      if (this.playerIsBusy && anim.ui) {
        document.getElementById(anim.ui).disabled = true;
        document.getElementById(anim.ui).style.pointerEvents = "none";
      } else if (!this.playerIsBusy && anim.ui) {
        document.getElementById(anim.ui).disabled = false;
        document.getElementById(anim.ui).style.pointerEvents = "auto";
      }
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1000,
  height: 400,
  pixelArt: true,
  scene: [Morokh],
};
const game = new Phaser.Game(config);
