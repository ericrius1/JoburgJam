var Spectrum;

FW.Spectrum = Spectrum = (function() {
  function Spectrum() {
    var cubeWidth, specBox, specBoxTemplate, specGeometry, specMat, spectrumBody, x, xPos, xRange, z, zPos;
    xRange = 1000;
    cubeWidth = 10;
    this.spectrumBodies = [];
    specGeometry = new THREE.CubeGeometry(10, 10, 10);
    specBoxTemplate = (function() {
      var _i, _results;
      _results = [];
      for (x = _i = -1; _i <= 1; x = ++_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (z = _j = -1; _j <= 1; z = ++_j) {
            xPos = map(x, -1, 1, -xRange / 2, xRange / 2);
            zPos = map(z, -1, 1, -xRange / 2, xRange / 2);
            specMat = new THREE.MeshBasicMaterial();
            specBox = new THREE.Mesh(specGeometry, specMat);
            specBox.material.color.setRGB(Math.random(), Math.random(), Math.random());
            specBox.position.set(xPos, 0, zPos);
            FW.scene.add(specBox);
            spectrumBody = THREEx.Oimo.createBodyFromMesh(FW.physicsWorld, specBox);
            spectrumBody.updater = new THREEx.Oimo.Body2MeshUpdater(spectrumBody, specBox);
            _results1.push(this.spectrumBodies.push(spectrumBody));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }).call(this);
  }

  Spectrum.prototype.update = function() {
    var body, i, posY, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = this.spectrumBodies.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      posY = map(FW.freqByteData[100], 0, 300, 0, 10);
      body = this.spectrumBodies[i];
      body.body.setPosition(body.x, posY, body.z);
      _results.push(body.updater.update());
    }
    return _results;
  };

  return Spectrum;

})();
