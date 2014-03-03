FW.Popcorn = class Popcorn
  constructor: ->
    #GROUND

    @createPopcornStand()
    @slowUpdate()
  
  createPopcornStand: ->
    #popcorn stand
    ground_material = Physijs.createMaterial \
      new THREE.MeshNormalMaterial()
      ,.4 # low friction
      ,0.3 # high restitution (bounciness)
    
    @ground = new Physijs.BoxMesh \
      new THREE.CubeGeometry(10, 5, 10)
      ,ground_material
      ,0 # mass
    @ground.receiveShadow = true
    FW.scene.add( @ground )

    #popcorn
    sphereGeometry = new THREE.SphereGeometry 2, 32, 32
    handleCollision = (collided_with, linearVelocity, angularVelocity)->
      @material.color = new THREE.Color(0xff00ff)

    ballMaterial = Physijs.createMaterial \
      new THREE.MeshBasicMaterial()
      , .2 # low friction
      , 1.0 # bouncy as shit!!
    @ball = new Physijs.SphereMesh sphereGeometry, ballMaterial, undefined
    @ball.position.set 0, 10, 0
    @ball.addEventListener 'collision', handleCollision
    FW.scene.add @ball
  

  slowUpdate : ->
    impulse = new THREE.Vector3 0, 100, 0
    @ball.applyImpulse impulse, @ball.position
    setTimeout  =>
      @slowUpdate()
    , 1000
    
        