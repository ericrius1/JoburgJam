var Popcorn;

FW.Popcorn = Popcorn = (function() {
  function Popcorn() {
    var ground_material;
    ground_material = Physijs.createMaterial(new THREE.MeshNormalMaterial(), .4, 0.3);
    this.ground = new Physijs.BoxMesh(new THREE.CubeGeometry(100, 5, 100), ground_material, 0);
    this.ground.receiveShadow = true;
    FW.scene.add(this.ground);
  }

  Popcorn.prototype.update = function() {};

  return Popcorn;

})();
