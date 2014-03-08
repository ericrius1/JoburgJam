var Screen;

FW.Screen = Screen = (function() {
  function Screen(position) {
    var canvas, ground_material, h, imageData, material2, pixelsRoot, w;
    this.position = position;
    canvas = document.getElementById('textureData');
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    imageData = this.context.createImageData(this.width, this.height);
    this.context.putImageData(imageData, 0, 0);
    this.texture = new THREE.Texture(canvas);
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.pixels = FW.frequencyBinCount / 4;
    pixelsRoot = Math.pow(FW.frequencyBinCount, 0.5);
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
        value: this.texture
      }
    };
    w = 1 / window.innerWidth;
    h = 1 / window.innerHeight;
    this.uniforms.resolution.value.set(w, h);
    material2 = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader1').textContent
    });
    ground_material = Physijs.createMaterial(material2, .4, 0.3);
    this.ground = new Physijs.BoxMesh(new THREE.CubeGeometry(20, 1, 20), ground_material, 0);
    this.ground.receiveShadow = true;
    FW.scene.add(this.ground);
  }

  Screen.prototype.setPixel = function(imageData, x, y, r, g, b, a) {
    var index;
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    return imageData.data[index + 3] = a;
  };

  Screen.prototype.update = function() {
    var a, b, g, i, imageData, r, time, x, y, _i, _ref;
    time = Date.now() - this.startTime;
    this.uniforms.time.value = time / 1000;
    imageData = this.context.createImageData(this.width, this.height);
    for (i = _i = 0, _ref = this.pixels; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      x = i;
      y = 0;
      r = FW.freqByteData[i] | 0;
      g = FW.freqByteData[i + 1] | 0;
      b = FW.freqByteData[i + 2] | 0;
      a = FW.freqByteData[i + 3] | 0;
      this.setPixel(imageData, x, y, r, g, b, a);
    }
    this.context.putImageData(imageData, 0, 0);
    return this.texture.needsUpdate = true;
  };

  return Screen;

})();
