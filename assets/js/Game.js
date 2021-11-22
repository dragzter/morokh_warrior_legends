import { playerAnimationsConfig } from "./playerFrames.js";
import { npcFrames, warriorNpc } from "./npcFrames.js";
import Assistant from "./Assistant.js";
import { Character, Player } from "./Character.js";
import PlayerUi from "./PlayerUi.js";

/**
 * ==============
 * GAME CLASS   |
 * ==============
 */

class Main extends Phaser.Scene {
  constructor() {
    super();
    this.characterAssetPath = "assets/img/characters/";
    this.bgAssetPath = "assets/img/bg/";
    this.playerIsRunning = false;
    this.playerIsDefensive = false;
    this.playerIsBusy = false; // Blocking, Attacking, Dead
    this.animationNames;
    this.playerScale = 3.5;
    this.playerId = "player";
  }

  generateAnimations() {
    this.assistant.createAnimations();
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
    this.assistant = new Assistant(this.load, this.anims, this.add);
    this.assistant.loadImage("bg", `${this.bgAssetPath}battleback1-1k.png`);
    this.assistant.loadImageCollection([playerAnimationsConfig, warriorNpc]);
    const PLAYER_1 = new Player();
  }

  create() {
    // Initialize Hud elements
    new PlayerUi().build(document.getElementById("hud"));

    // Create Animation configs
    this.generateAnimations();
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    // Add sprites
    this.player = this.add.sprite(280, 200);
    this.npcWarrior = this.add.sprite(700, 182);

    this.player.setScale(this.playerScale);

    this.player.on(
      "animationcomplete",
      () => {
        this.playerIsBusy = false;
        this.playerIsRunning = false;
      },
      this
    );

    // Add event listeners
    this.initEventListeners();
    this.npcWarrior.flipX = true;
    this.npcWarrior.setScale(1.9);
    this.npcWarrior.play("war_npc_idle", true);

    // Initiate the keyboard keys we will use
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

    // Animation meta contains additional properties for UI actions
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
  scene: [Main],
};
const game = new Phaser.Game(config);
