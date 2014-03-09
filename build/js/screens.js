var Screens;

FW.Screens = Screens = (function() {
  function Screens() {
    var canvas, imageData, pixelsRoot;
    this.screens = [];
    this.screenSize = 20;
    this.numUnitsAcross = 4;
    FW.screenGeometry = new THREE.CubeGeometry(this.screenSize, 1, this.screenSize);
    canvas = document.getElementById('textureData');
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    imageData = this.context.createImageData(this.width, this.height);
    this.context.putImageData(imageData, 0, 0);
    FW.screenTexture = new THREE.Texture(canvas);
    FW.screenTexture.wrapS = FW.screenTexture.wrapT = THREE.RepeatWrapping;
    this.pixels = FW.frequencyBinCount / 4;
    pixelsRoot = Math.pow(FW.frequencyBinCount, 0.5);
    this.layoutScreens();
  }

  Screens.prototype.setPixel = function(imageData, x, y, r, g, b, a) {
    var index;
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    return imageData.data[index + 3] = a;
  };

  Screens.prototype.layoutScreens = function() {
    var position, startingXPos, startingZPos, x, xPos, z, zPos, _i, _ref, _results;
    startingXPos = -40;
    startingZPos = -40;
    _results = [];
    for (x = _i = 0, _ref = this.numUnitsAcross; 0 <= _ref ? _i < _ref : _i > _ref; x = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (z = _j = 0, _ref1 = this.numUnitsAcross; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; z = 0 <= _ref1 ? ++_j : --_j) {
          xPos = startingXPos + (x * this.screenSize);
          console.log('xPos', xPos);
          zPos = startingZPos + (z * this.screenSize);
          position = new THREE.Vector3(xPos, 0, zPos);
          _results1.push(this.screens.push(new FW.Screen(position)));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

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
    return FW.screenTexture.needsUpdate = true;
  };

  return Screens;

})();
