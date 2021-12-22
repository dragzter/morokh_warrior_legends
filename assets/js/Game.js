import { playerAnimationsConfig } from "./playerFrames.js";
import { npcFrames, warriorNpc } from "./npcFrames.js";
import Assistant from "./Assistant.js";
import { Character, Enemy, Player } from "./Character.js";
import GameLifeCycle from "./GameLifeCycle.js";
/**
 * ==============
 * GAME CLASS   |
 * ==============
 */

class Main extends Phaser.Scene {
  constructor() {
    super();
    this.disableButtons = false;
    this.characterAssetPath = "assets/img/characters/";
    this.bgAssetPath = "assets/img/bg/";
  }

  preload() {
    this.assistant = new Assistant(this);
    this.assistant.loadImage("bg", `${this.bgAssetPath}battleback1-1k.png`);
    this.assistant.loadImageCollection([playerAnimationsConfig, warriorNpc]);
  }

  create() {
    this.keys = this.input.keyboard.addKeys("RIGHT,LEFT,Z", true);
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.assistant.createAnimations();

    this.PLAYER_1 = new Player(this);
    this.EMENY = new Enemy(this);
    this.GAME_LOOP = new GameLifeCycle(this.PLAYER_1, this.EMENY);
    this.PLAYER_1.name = "Emerthon";

    this.GAME_LOOP.attack();

    // Create Animation configs

    /**
     * 1. Start fight
     *   a. Skills are available to use
     *   b. Provision opponent
     *     i. Opponent stats (hp, dmg, name, meta info)
     *     ii. Opponent animations
     *     iii. Opponent skills (attack/defend)
     *     iv. Provision sprite
     *     v. Place sprite on canvas
     *   c. ???
     *   d. Action points are full (action points determine what can be done)
     *   e. Can fight or flee - go to previous state (place)
     * 2. Player has a turn
     *   a. Player makes a move
     *   b. If Attack
     *     i. Determine if hit - get opponent avoidance chance, and player miss chance
     *     ii. If hit, check if crit
     *     iii.  Subtract hp from opponent
     *     iv. Calculate game status (hp, check if fight is over)
     *   c. If Ability/Buff/Effect
     *     i. Apply effect to player
     *     ii. Calculate game status
     *   d. End turn
     * 3. Opponents turn
     *   a. Asses status (hp)
     *   b. Decide what ability to use based on status
     *
     *
     */

    // Add sprites
    this.PLAYER_1.initPlayer();

    // Add event listeners
    this.PLAYER_1.initHandlers();

    // TODO - dynamically generate opponent
    this.npcWarrior = this.add.sprite(700, 182);
    this.npcWarrior.flipX = true;
    this.npcWarrior.setScale(1.9);
    this.npcWarrior.play("war_npc_idle", true);

    this.add.text(10, 10, this.PLAYER_1.getName);
    this.add.text(780, 10, "Bold Warrior");
    // Initiate the keyboard keys we will use
  }

  update() {
    this.PLAYER_1.updatePlayer();
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
