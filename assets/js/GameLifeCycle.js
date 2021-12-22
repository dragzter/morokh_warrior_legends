export default class GameLifeCycle {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  attack() {
    console.log(this.player1, this.player2);
  }
}
