import { playerAnimations } from "./frames.js";
import Assistant from "./Assistant.js";
import Character from "./Character.js";
import Hud from "./Hud.js";

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
    this.animationObjects;
    this.animationNames;
    this.playerScale = 3.5;
    this.playerId = "player";
  }

  createAnimations() {
    this.animationObjects = this.assistant.createAnimations(this.anims);
    this.animationNames = this.assistant.getAnimationNames;
  }

  initEventListeners() {
    this.animationNames.forEach((anim) => {
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
          `${this.playerAssetPath}${playerAnimations[animation].sprites[value]}`
        );
      }
    }
  }

  create() {
    // Initialize Hud elements
    new Hud().createAndAppendHudElements(document.getElementById("hud"));

    // Create Animation configs
    this.createAnimations();
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    // Add player sprite
    this.player = this.add.sprite(180, 200, this.playerId);
    this.player.setScale(this.playerScale);

    this.player.on(
      "animationcomplete",
      () => {
        this.playerIsBusy = false;
        this.playerIsRunning = false;
      },
      this
    );

    this.initEventListeners();

    // Initiate the keys we will use
    this.keys = this.input.keyboard.addKeys("RIGHT,LEFT,Z", true);
  }

  update() {
    if (this.keys.RIGHT.isUp) this.playerIsRunning = false;
    if (!this.playerIsRunning && !this.playerIsBusy) {
      if (!this.playerIsDefensive) {
        this.player.play("player_idle", true);
      } else {
        this.player.play("player_block_idle", true);
      }
    }

    this.animationNames.forEach((anim) => {
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
