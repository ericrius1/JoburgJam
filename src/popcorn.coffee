FW.Popcorn = class Popcorn
  constructor: ->
    #GROUND
    ground_material = Physijs.createMaterial \
      new THREE.MeshNormalMaterial()
      ,.4 # low friction
      ,0.3 # high restitution (bounciness)
    
    @ground = new Physijs.BoxMesh \
      new THREE.CubeGeometry(100, 5, 100)
      ,ground_material
      ,0 # mass
    @ground.receiveShadow = true
    FW.scene.add( @ground )
    @spawnBall()
    @slowUpdate()



  spawnBall: =>
    sphereGeometry = new THREE.SphereGeometry 2, 32, 32
    handleCollision = (collided_with, linearVelocity, angularVelocity)->
      console.log 'collision'

    ballMaterial = Physijs.createMaterial \
      new THREE.MeshNormalMaterial()
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
    , 1000
    
        