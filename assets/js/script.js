import { playerAnimations } from "./frames.js";
import Assistant from "./assistant.js";
import Character from "./character.js";

// ================
// GLOBAL SCOPE
// ================

// Frame COONSTANTS
const PLAYER_SCALE = 3.5;
const PLAYER_RUN = "player_run";
const PLAYER_IDLE = "player_idle";
const PLAYER_ATK_1 = "player_attack_1";
const PLAYER_ATK_2 = "player_attack_2";
const PLAYER_ATK_3 = "player_attack_3";
const PLAYER_BLOCK = "player_block";
const PLAYER_BLOCK_IDLE = "player_block_idle";
const PLAYER = "player";

// UI Elements
const playerAttack1Btn = document.getElementById("attack1");
const playerAttack2Btn = document.getElementById("attack2");
const playerAttack3Btn = document.getElementById("attack3");
const playerBlockBtn = document.getElementById("block");
const defensiveStanceBtn = document.getElementById("def_stance");

/**
 * ==============
 * GAME CLASS   |
 * ==============
 */
class Morokh extends Phaser.Scene {
  constructor() {
    super();
    this.playerAssetPath = "assets/img/characters/player/";
    this.bgAssetPath = "assets/img/bg/";
    this.assistant = new Assistant();
    this.playerIsRunning = false;
    this.playerIsDefensive = false;
    this.playerIsBusy = false; // Blocking, Attacking, Dead
  }

  createAnimations() {
    const idleFrames = this.assistant.getFrameObject(playerAnimations.idle);
    const runFrames = this.assistant.getFrameObject(playerAnimations.run);
    const blockIdleFrames = this.assistant.getFrameObject(
      playerAnimations.block_idle
    );
    const blockFrames = this.assistant.getFrameObject(playerAnimations.block);
    const attack1Frames = this.assistant.getFrameObject(
      playerAnimations.attack1
    );
    const attack2Frames = this.assistant.getFrameObject(
      playerAnimations.attack2
    );
    const attack3Frames = this.assistant.getFrameObject(
      playerAnimations.attack3
    );
    this.anims.create({
      key: PLAYER_IDLE,
      frames: idleFrames,
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: PLAYER_RUN,
      frames: runFrames,
      frameRate: 13,
      repeat: -1,
    });
    this.anims.create({
      key: PLAYER_ATK_1,
      frames: attack1Frames,
      frameRate: 10,
    });
    this.anims.create({
      key: PLAYER_ATK_2,
      frames: attack2Frames,
      frameRate: 10,
    });
    this.anims.create({
      key: PLAYER_ATK_3,
      frames: attack3Frames,
      frameRate: 12,
    });
    this.anims.create({
      key: PLAYER_BLOCK,
      frames: blockFrames,
      frameRate: 10,
    });
    this.anims.create({
      key: PLAYER_BLOCK_IDLE,
      frames: blockIdleFrames,
      frameRate: 10,
    });
  }

  initEventListeners() {
    playerAttack1Btn.addEventListener("click", () => {
      this.playerIsBusy = true;
      this.player.play(PLAYER_ATK_1, true);
    });

    playerAttack2Btn.addEventListener("click", () => {
      this.playerIsBusy = true;
      this.player.play(PLAYER_ATK_2, true);
    });

    playerAttack3Btn.addEventListener("click", () => {
      this.playerIsBusy = true;
      this.player.play(PLAYER_ATK_3, true);
    });

    playerBlockBtn.addEventListener("click", () => {
      this.playerIsBusy = true;
      this.player.play(PLAYER_BLOCK, true);
    });

    defensiveStanceBtn.addEventListener("click", () => {
      this.playerIsDefensive = !this.playerIsDefensive;
    });
  }

  preload() {
    this.load.image("bg", `${this.bgAssetPath}battleback1-1k.png`);

    for (const animation in playerAnimations) {
      for (const value in playerAnimations[animation]) {
        this.load.image(
          value,
          `${this.playerAssetPath}${playerAnimations[animation][value]}`
        );
      }
    }
  }

  create() {
    // Create Animation configs
    this.createAnimations();
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    console.log(RPGUI); // It exists

    // Add player sprite
    this.player = this.add.sprite(180, 200, PLAYER);
    this.player.setScale(PLAYER_SCALE);

    this.player.on(
      "animationcomplete",
      () => {
        this.playerIsBusy = false;
        this.playerIsRunning = false;
      },
      this
    );

    this.initEventListeners();

    this.keys = this.input.keyboard.addKeys("RIGHT,LEFT,Z", true);
  }

  update() {
    if (this.keys.RIGHT.isDown) {
      this.playerIsRunning = true;
      this.player.play(PLAYER_RUN, true);
    }
    if (this.keys.RIGHT.isUp) this.playerIsRunning = false;
    if (!this.playerIsRunning && !this.playerIsBusy) {
      if (!this.playerIsDefensive) {
        this.player.play(PLAYER_IDLE, true);
      } else {
        this.player.play(PLAYER_BLOCK_IDLE, true);
      }
    }
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
