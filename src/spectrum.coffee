FW.Spectrum = class Spectrum
  constructor: ->
    #set up a row of 1024 cubes- each one representing a fequency bin
    xRange = 1000
    cubeWidth = 10
    @spectrumBodies = []

    specGeometry = new THREE.CubeGeometry 10, 10, 10

    specBoxTemplate = 
    for x in [-1..1]
      for z in [-1..1] 
        xPos = map x, -1, 1, -xRange/2, xRange/2
        zPos = map z, -1, 1, -xRange/2, xRange/2
        specMat = new THREE.MeshBasicMaterial()
        specBox = new THREE.Mesh specGeometry, specMat
        specBox.material.color.setRGB Math.random(), Math.random(), Math.random()
        specBox.position.set xPos, 0, zPos
        FW.scene.add specBox
        spectrumBody = THREEx.Oimo.createBodyFromMesh(FW.physicsWorld, specBox)
        spectrumBody.updater = new THREEx.Oimo.Body2MeshUpdater(spectrumBody, specBox)
        @spectrumBodies.push spectrumBody


  update: ->
    for i in [0...@spectrumBodies.length]
        posY = map(FW.freqByteData[100], 0, 300, 0, 10)
        body = @spectrumBodies[i].body
        body.setPosition(body.position.x, posY, body.position.z)
        @spectrumBodies[i].updater.update()

        




