class Ground extends Phaser.TileSprite {
  constructor({ game, x, y, width, height, asset }) {
    super(game, x, y, width, height, asset);

    // Enable Physics
    // not so that this ground can fall
    // because of gravity
    // but so that this ground can come into
    // contact with the Bird (collision detection)
    this.game.physics.arcade.enableBody(this);

    // Yeah here it is we
    // disable the gravity on this object
    this.body.allowGravity = false;

    // When Bird and Ground collides
    // (check update method on Play.js) it will
    // tell the Physics to check the collision
    // and apply whatever Physics simulation
    // there.
    // Even though we said it doesn't allow
    // gravity on this Ground,
    // when the Bird collides with Ground
    // it will apply the collision, which in this case
    // a Bird moving and collide with a Ground
    // which will cause Ground to move alongside
    // with the Bird.
    // Therefore we set immovable to true
    // to make ground immovable
    this.body.immovable = true;
    
    // Scroll the ground in negative x direction
    this.autoScroll(-200, 0);
  }
}

export default Ground;
