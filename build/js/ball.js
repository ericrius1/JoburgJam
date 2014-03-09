var Ball;

FW.Ball = Ball = (function() {
  function Ball() {
    var ballMaterial, sphereGeometry;
    sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    ballMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial(), .2, 1.0);
    this.ball = new Physijs.SphereMesh(sphereGeometry, ballMaterial, void 0);
    this.ball.position.set(0, 10, 0);
    FW.scene.add(this.ball);
  }

  return Ball;

})();
