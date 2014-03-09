var Ball;

FW.Ball = Ball = (function() {
  function Ball(position) {
    var ballMaterial, sphereGeometry;
    this.position = position;
    sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    ballMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial(), .2, 1.0);
    this.ball = new Physijs.SphereMesh(sphereGeometry, ballMaterial, void 0);
    this.ball.position = this.position;
    FW.scene.add(this.ball);
  }

  return Ball;

})();
