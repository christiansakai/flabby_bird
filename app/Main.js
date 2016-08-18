// import Bird from "./Bird";

// class Main extends Phaser.State {
//   preload() {
//     // Load the bird sprite
//     this.game.load.image("bird", "/bird.png");
//   }

//   create() {
//     // Change the background color of the game to blue
//     this.game.stage.backgroundColor = "#71c5cf";

//     // Set the physics of the game
//     this.game.physics.startSystem(Phaser.Physics.ARCADE);

//     // Set bird
//     this.bird = new Bird({ 
//       game: this.game, 
//       x: 100, 
//       y: 245, 
//       asset: "bird"
//     });
//     this.bird.enableGravity({
//       physicsEngine: Phaser.Physics.ARCADE,
//       weight: 1
//     });
//     this.game.add.existing(this.bird);

//     this.control = new Control({ game: this.game });
//     this.control.addKeyAndEvent({
//       key: Phaser.Keyboard.SPACEBAR,
//       onDown: () => {
//         this.bird.jump();
//       }
//     });

//     // const spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//     // spaceKey.onDown.add(() => {
//     //   this.bird.jump();
//     // });
//   }

//   update() {

//   }

//   restartGame() {
//     this.game.state.start("Main");
//   }
// }

// export default Main;
