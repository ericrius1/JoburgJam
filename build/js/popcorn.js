var Popcorn,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.Popcorn = Popcorn = (function() {
  function Popcorn() {
    this.spawnBall = __bind(this.spawnBall, this);
    var ground_material;
    ground_material = Physijs.createMaterial(new THREE.MeshNormalMaterial(), .4, 0.3);
    this.ground = new Physijs.BoxMesh(new THREE.CubeGeometry(100, 5, 100), ground_material, 0);
    this.ground.receiveShadow = true;
    FW.scene.add(this.ground);
    this.spawnBall();
    this.slowUpdate();
  }

  Popcorn.prototype.spawnBall = function() {
    var ballMaterial, handleCollision, sphereGeometry;
    sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    handleCollision = function(collided_with, linearVelocity, angularVelocity) {
      return console.log('collision');
    };
    ballMaterial = Physijs.createMaterial(new THREE.MeshNormalMaterial(), .2, 1.0);
    this.ball = new Physijs.SphereMesh(sphereGeometry, ballMaterial, void 0);
    this.ball.position.set(0, 10, 0);
    this.ball.addEventListener('collision', handleCollision);
    return FW.scene.add(this.ball);
  };

  Popcorn.prototype.slowUpdate = function() {
    var impulse,
      _this = this;
    impulse = new THREE.Vector3(0, 1000, 0);
    this.ball.applyImpulse(impulse, this.ball.position);
    return setTimeout(function() {
      return _this.slowUpdate();
    }, 1000);
  };

  return Popcorn;

})();
