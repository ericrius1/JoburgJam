FW.Popcorn = class Popcorn
  constructor: ->
    #create a canvas element
    canvas = document.getElementById('textureData')
    @context = canvas.getContext('2d')

    #read the width and height of the canvas
    @width = canvas.width
    @height = canvas.height

    imageData = @context.createImageData(@width, @height)
    @context.putImageData imageData, 0, 0

    #Assigns the texture
    @texture = new THREE.Texture canvas

    #wrap the texture so we have 'infinite' data 
    @texture.wrapS = @texture.wrapT = THREE.RepeatWrapping

    @pixels = FW.frequencyBinCount / 4
    pixelsRoot = Math.pow FW.frequencyBinCount, 0.5
    @uniforms = 
      time: {type: 'f', value: 1.0}
      resolution: { type: 'v2', value: new THREE.Vector2()}
      mouse: {type: 'v2', value: new THREE.Vector2(.29, .53)}
      texture: {type: 't', value: @texture}

    w = 1/window.innerWidth
    h = window.innerHeight
    @uniforms.resolution.value.set w, h


    @createPopcornStand()
    @slowUpdate()

  createPopcornStand: ->
    #popcorn stand
    material2 = new THREE.ShaderMaterial
      uniforms: @uniforms
      vertexShader: document.getElementById('vertexShader').textContent
      fragmentShader: document.getElementById('fragmentShader1').textContent
    ground_material = Physijs.createMaterial \
      material2
      ,.4 # low friction
      ,0.3 # high restitution (bounciness)
    
    @ground = new Physijs.BoxMesh \
      new THREE.CubeGeometry(20, 1, 20)
      ,ground_material
      ,0 # mass
    @ground.receiveShadow = true
    FW.scene.add( @ground )

    #popcorn
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

   update: ->
    time = Date.now() - @startTime
    @uniforms.time.value = time/1000
    #creates the image data 
    imageData = @context.createImageData @width, @height


    #Transfer audio data to rgb values 
    for i in [0...@pixels]
      x = i
      y = 0
      r = FW.freqByteData[i] | 0
      g = FW.freqByteData[i+1] | 0
      b = FW.freqByteData[i+2] | 0
      a = FW.freqByteData[i+3]| 0
      @setPixel imageData, x, y, r, g, b, a

    @context.putImageData imageData, 0, 0

    #updates the texture
    @texture.needsUpdate = true

  #Sets pixel data to the image data
  setPixel: (imageData, x, y, r, g, b, a) ->
    index = (x+ y * imageData.width) * 4
    imageData.data[index + 0] = r
    imageData.data[index + 1] = g
    imageData.data[index + 2] = b
    imageData.data[index + 3] = a
    
        