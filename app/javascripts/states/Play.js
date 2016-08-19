import Bird from "../prefabs/Bird";
import Ground from "../prefabs/Ground";

class Play extends Phaser.State {
  create() {
    this.createPhysics();
    this.createBackground();
    this.createObjects();
    this.createControls();
  }

  createObjects() {
    // Create the bird object
    // and save it to this.bird as reference
    this.bird = new Bird({
      game: this.game,
      x: 100,
      y: this.game.height / 2,
      asset: "bird"
    });
    // And add it to the game
    this.game.add.existing(this.bird);

    // Create the ground object
    // and save it to this.ground as reference
    this.ground = new Ground({
      game: this.game,
      x: 0,
      y: 400,
      width: 335,
      height: 112,
      asset: "ground"
    });
    this.game.add.existing(this.ground);
  }

  createPhysics() {
    // Add default Physics for the game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // GLOBAL gravity for the game world
    this.game.physics.arcade.gravity.y = 1200;
  }

  createBackground() {
    // Add a background sprite
    // game.add will automatically add it to World's children
    // this sprite does not fall due to gravity
    // because we do not enable the physics
    // enabled on this sprite
    const background = this.game.add.sprite(0, 0, "background");
  }

  createControls() {
    // Prevents the spacebar event from
    // propagating into the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // Add keyboard controls
    const flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // This key will call this.bird.flap
    // from this.bird
    flapKey.onDown.add(this.bird.flap, this.bird);

    // Add mouse/touch controls
    this.game.input.onDown.add(this.bird.flap, this.bird);
  }

  update() {
    // On every frame update
    // check collision between this.bird and this.ground
    this.game.physics.arcade.collide(this.bird, this.ground);
  }
}

export default Play;
