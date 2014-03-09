var Screen;

FW.Screen = Screen = (function() {
  function Screen(position) {
    var h, material, screenMaterial, w;
    this.uniforms = {
      time: {
        type: 'f',
        value: 1.0
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2()
      },
      mouse: {
        type: 'v2',
        value: new THREE.Vector2(.29, .53)
      },
      texture: {
        type: 't',
        value: FW.screenTexture
      }
    };
    w = 1 / window.innerWidth;
    h = 1 / window.innerHeight;
    this.uniforms.resolution.value.set(w, h);
    material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader1').textContent
    });
    screenMaterial = Physijs.createMaterial(material, .4, 0.3);
    this.screen = new Physijs.BoxMesh(new THREE.CubeGeometry(20, 1, 20), screenMaterial, 0);
    this.screen.position = position;
    FW.scene.add(this.screen);
  }

  return Screen;

})();
