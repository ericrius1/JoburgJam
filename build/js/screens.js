var Screens;

FW.Screens = Screens = (function() {
  function Screens() {
    var canvas, geo, h, imageData, material, mesh, pixelsRoot, uniforms, w;
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
    uniforms = {
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
        value: new THREE.Vector2()
      },
      texture: {
        type: 't',
        value: this.texture
      }
    };
    w = 1 / window.innerWidth;
    h = window.innerHeight;
    uniforms.resolution.value.set(w, h);
    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    });
    geo = new THREE.PlaneGeometry(2, 2);
    mesh = new THREE.Mesh(geo, material);
    FW.scene.add(mesh);
    document.onmousemove = function(e) {
      uniforms.mouse.value.x = e.pageX / window.innerWidth;
      return uniforms.mouse.value.y = e.pageY / window.innerHeight;
    };
  }

  Screens.prototype.update = function() {
    var a, b, g, i, imageData, r, x, y, _i, _ref;
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

  Screens.prototype.setPixel = function(imageData, x, y, r, g, b, a) {
    var index;
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    return imageData.data[index + 3] = a;
  };

  return Screens;

})();
