var Ball;

FW.Ball = Ball = (function() {
  function Ball() {
    var ballMaterial, handleCollision, sphereGeometry,
      _this = this;
    sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    handleCollision = function(collided_with, linearVelocity, angularVelocity) {
      var x, y;
      x = rnd(.29, .53);
      y = rnd(.5, .9);
      return _this.uniforms.mouse.value.set(x, .54);
    };
    ballMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial(), .2, 1.0);
    this.ball = new Physijs.SphereMesh(sphereGeometry, ballMaterial, void 0);
    this.ball.position.set(0, 10, 0);
    this.ball.addEventListener('collision', handleCollision);
    FW.scene.add(this.ball);
  }

  Ball.prototype.slowUpdate = function() {
    var impulse,
      _this = this;
    impulse = new THREE.Vector3(0, 1000, 0);
    this.ball.applyImpulse(impulse, this.ball.position);
    return setTimeout(function() {
      return _this.slowUpdate();
    }, 3000);
  };

  return Ball;

})();
