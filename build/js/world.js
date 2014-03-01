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
    FW.camera = new THREE.PerspectiveCamera(45.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    FW.camera.position.z = 20;
    this.controls = new THREE.TrackballControls(FW.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    FW.scene = new THREE.Scene();
    this.initSceneObjects();
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
    var light;
    light = new THREE.DirectionalLight(0xaa00aa, 1);
    light.position.set(0, 1, 0);
    FW.scene.add(light);
    light = new THREE.DirectionalLight(0x44aaaa, 1);
    light.position.set(0, -1, 0);
    FW.scene.add(light);
    return this.haze = new FW.Haze();
  };

  World.prototype.onWindowResize = function(event) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    return FW.camera.updateProjectionMatrix();
  };

  World.prototype.animate = function() {
    this.haze.update();
    return this.render();
  };

  World.prototype.render = function() {
    var delta;
    delta = FW.clock.getDelta();
    this.controls.update();
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  return World;

})();
