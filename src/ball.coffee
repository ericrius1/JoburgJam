FW.Ball= class Ball
  constructor: ->
    sphereGeometry = new THREE.SphereGeometry 2, 32, 32
    handleCollision = (collided_with, linearVelocity, angularVelocity)=>
      x = rnd(.29, .53)
      y = rnd(.5, .9)
      @uniforms.mouse.value.set x, .54

    ballMaterial = Physijs.createMaterial \
      new THREE.MeshBasicMaterial()
      , .2 # low friction
      , 1.0 # bouncy as shit!!
    @ball = new Physijs.SphereMesh sphereGeometry, ballMaterial, undefined
    @ball.position.set 0, 10, 0
    @ball.addEventListener 'collision', handleCollision
    FW.scene.add @ball

  slowUpdate : ->
    impulse = new THREE.Vector3 0, 1000, 0
    @ball.applyImpulse impulse, @ball.position
    setTimeout  =>
      @slowUpdate()
    , 3000
