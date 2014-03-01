var World,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.World = World = (function() {
  function World() {
    this.animate = __bind(this.animate, this);
    var _this = this;
    FW.clock = new THREE.Clock();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.camFar = 2000;
    FW.audio.masterGain.value = 1;
    this.bodyUpdaters = [];
    FW.camera = new THREE.PerspectiveCamera(45.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    FW.camera.position.set(0, 40, 1000);
    this.controls = new THREE.TrackballControls(FW.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    FW.scene = new THREE.Scene();
    this.world = new OIMO.World();
    this.initSceneObjects();
    this.iomoStats = new THREEx.Oimo.Stats(this.world);
    FW.Renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    document.body.appendChild(FW.Renderer.domElement);
    window.addEventListener("resize", (function() {
      return _this.onWindowResize();
    }), false);
  }

  World.prototype.initSceneObjects = function() {
    var body, geometry, ground, material, mesh;
    geometry = new THREE.CubeGeometry(100, 100, 400);
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -geometry.height / 2;
    FW.scene.add(mesh);
    ground = THREEx.Oimo.createBodyFromMesh(this.world, mesh, false);
    geometry = new THREE.SphereGeometry(5);
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 1000;
    FW.scene.add(mesh);
    body = THREEx.Oimo.createBodyFromMesh(this.world, mesh);
    return this.bodyUpdaters.push(new THREEx.Oimo.Body2MeshUpdater(body, mesh));
  };

  World.prototype.onWindowResize = function(event) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    return FW.camera.updateProjectionMatrix();
  };

  World.prototype.animate = function() {
    var delta, updater, _i, _len, _ref;
    this.iomoStats.update();
    this.world.step();
    _ref = this.bodyUpdaters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      updater = _ref[_i];
      updater.update();
    }
    this.controls.update();
    delta = FW.clock.getDelta();
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  return World;

})();