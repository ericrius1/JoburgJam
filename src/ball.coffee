FW.Ball= class Ball
  constructor: ->
    sphereGeometry = new THREE.SphereGeometry 2, 32, 32

    ballMaterial = Physijs.createMaterial \
      new THREE.MeshBasicMaterial()
      , .2 # low friction
      , 1.0 # bouncy as shit!!
    @ball = new Physijs.SphereMesh sphereGeometry, ballMaterial, undefined
    @ball.position.set 0, 10, 0
    FW.scene.add @ball

