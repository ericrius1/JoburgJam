var Popcorn;

FW.Popcorn = Popcorn = (function() {
  function Popcorn() {
    this.createPopcornStand();
    this.slowUpdate();
  }

  Popcorn.prototype.createPopcornStand = function() {
    var ballMaterial, ground_material, handleCollision, sphereGeometry;
    ground_material = Physijs.createMaterial(new THREE.MeshNormalMaterial(), .4, 0.3);
    this.ground = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 5, 10), ground_material, 0);
    this.ground.receiveShadow = true;
    FW.scene.add(this.ground);
    sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    handleCollision = function(collided_with, linearVelocity, angularVelocity) {
      return this.material.color = new THREE.Color(0xff00ff);
    };
    ballMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial(), .2, 1.0);
    this.ball = new Physijs.SphereMesh(sphereGeometry, ballMaterial, void 0);
    this.ball.position.set(0, 10, 0);
    this.ball.addEventListener('collision', handleCollision);
    return FW.scene.add(this.ball);
  };

  Popcorn.prototype.slowUpdate = function() {
    var impulse,
      _this = this;
    impulse = new THREE.Vector3(0, 100, 0);
    this.ball.applyImpulse(impulse, this.ball.position);
    return setTimeout(function() {
      return _this.slowUpdate();
    }, 1000);
  };

  return Popcorn;

})();
