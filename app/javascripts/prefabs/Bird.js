class Bird extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    // Set this sprite's anchor to the senter
    // anchor is a Canvas API
    this.anchor.setTo(0.5, 0.5);

    // Add animation to this bird
    // based on the frame
    this.animations.add("flap");
    // Play the animation 
    // 12 framerate, loop true
    this.animations.play("flap", 12, true);

    // Enable Physics to affect this sprite
    this.game.physics.arcade.enableBody(this);
  }

  flap() {
    // Fly my bird!!
    // set the upward velocity to -400
    // since the bird is affected by gravity
    // it will go down
    this.body.velocity.y = -400;
    
    // We want the bird to point upward
    // when it flaps
    // Use tween to animate.
    // Remember tween is different than animation.
    // Animation is taken straight from the sprite frames.
    // Tween is manipulated by Phaser
    // rotate the bird to -40 degrees
    const birdTween = this.game.add.tween(this)
    birdTween.to({ angle: -40 }, 100);
    birdTween.start();
  }

  update() {
    // Because this bird is an extension of
    // Phaser.Sprite
    // its update function is called
    // automatically by Phaser just like
    // state update
    // Check to see if our angle is less than 90
    // if it is, rotate the bird towards the ground
    // by 2.5 degrees
    this.angle += 2.5;
  }
}

export default Bird;
