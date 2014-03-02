var World,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.World = World = (function() {
  function World() {
    this.spawnBall = __bind(this.spawnBall, this);
    this.render = __bind(this.render, this);
    var _this = this;
    FW.clock = new THREE.Clock();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.camFar = 200000;
    FW.audio.masterGain.value = 1;
    FW.bodies = [];
    FW.camera = new THREE.PerspectiveCamera(45.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    FW.camera.position.set(0, 50, 100);
    this.controls = new THREE.TrackballControls(FW.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.initStats();
    Physijs.scripts.worker = '/lib/physijs/physijs_worker.js';
    Physijs.scripts.ammo = '/lib/physijs/ammo.js';
    FW.scene = new Physijs.Scene();
    FW.scene.addEventListener('update', function() {
      FW.scene.simulate(void 0, 1);
      return _this.physics_stats.update();
    });
    this.initSceneObjects();
    FW.Renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    document.body.appendChild(FW.Renderer.domElement);
    window.addEventListener("resize", (function() {
      return _this.onWindowResize();
    }), false);
    FW.scene.simulate();
  }

  World.prototype.initSceneObjects = function() {
    var ground, ground_material;
    ground_material = Physijs.createMaterial(new THREE.MeshNormalMaterial(), .8, 1.0);
    ground = new Physijs.BoxMesh(new THREE.CubeGeometry(100, 1, 100), ground_material, 0);
    ground.receiveShadow = true;
    FW.scene.add(ground);
    this.spectrum = new FW.Spectrum();
    this.popcorn = new FW.Popcorn();
    return this.spawnBall();
  };

  World.prototype.onWindowResize = function(event) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    return FW.camera.updateProjectionMatrix();
  };

  World.prototype.render = function() {
    var delta;
    this.spectrum.update();
    this.popcorn.update();
    this.controls.update();
    this.render_stats.update();
    delta = FW.clock.getDelta();
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  World.prototype.initStats = function() {
    this.render_stats = new Stats();
    this.render_stats.domElement.style.position = 'absolute';
    this.render_stats.domElement.style.top = '0px';
    this.render_stats.domElement.style.zIndex = 100;
    document.body.appendChild(this.render_stats.domElement);
    this.physics_stats = new Stats();
    this.physics_stats.domElement.style.position = 'absolute';
    this.physics_stats.domElement.style.top = '50px';
    this.physics_stats.domElement.style.zIndex = 100;
    return document.body.appendChild(this.physics_stats.domElement);
  };

  World.prototype.spawnBall = function() {
    var box, box_geometry, handleCollision, material,
      _this = this;
    box_geometry = new THREE.SphereGeometry(4);
    handleCollision = function(collided_with, linearVelocity, angularVelocity) {};
    material = Physijs.createMaterial(new THREE.MeshNormalMaterial(), .6, 1.0);
    box = new Physijs.BoxMesh(box_geometry, material);
    box.position.set(Math.random() * 15 - 7.5, 25, Math.random() * 15 - 7.5);
    box.addEventListener('collision', handleCollision);
    FW.scene.add(box);
    return setTimeout(function() {
      return _this.spawnBall();
    }, 1000);
  };

  return World;

})();
