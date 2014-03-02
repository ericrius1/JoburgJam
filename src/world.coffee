
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 200000
    FW.audio.masterGain.value = 1
    FW.bodies= []

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(45.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set 0, 50, 100
    
    #CONTROLS
    # @controls = new THREE.PathControls(FW.camera)
    # @controls.waypoints = [ [ 0, 0, 0], [0, 0, -30] ];
    # @controls.duration = 280
    # @controls.useConstantSpeed = true
    # @controls.lookSpeed = .0001
    # @controls.lookVertical = true
    # @controls.lookHorizontal = true
    # @controls.init()

    @controls = new THREE.TrackballControls(FW.camera)

    @controls.rotateSpeed = 1.0;
    @controls.zoomSpeed = 1.2;
    @controls.panSpeed = 0.8;

    @controls.noZoom = false;
    @controls.noPan = false;

    @controls.staticMoving = true;
    @controls.dynamicDampingFactor = 0.3;


    # SCENE 
    FW.scene = new THREE.Scene()
    # FW.scene.add @controls.animationParent
    FW.physicsWorld = new OIMO.World()
    @initSceneObjects()
    
 
    
    @iomoStats = new THREEx.Oimo.Stats(FW.physicsWorld)
    document.body.appendChild(@iomoStats.domElement)



    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer({antialias: true})
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false

    # @controls.animation.play(true, 0)
    #start animation



  initSceneObjects: ->
    #GROUND
    geometry  = new THREE.CubeGeometry(2000,50, 2000)
    material  = new THREE.MeshNormalMaterial()
    mesh  = new THREE.Mesh( geometry, material )
    mesh.position.y = -geometry.height/2
    FW.scene.add(mesh)
    ground  = THREEx.Oimo.createBodyFromMesh(FW.physicsWorld, mesh, false)

    #CUBE
    geometry = new THREE.SphereGeometry(1)
    material = new THREE.MeshBasicMaterial(color: 0xff00ff)
    mesh = new THREE.Mesh geometry, material
    mesh.position.y = 10
    FW.scene.add mesh
    body  = THREEx.Oimo.createBodyFromMesh(FW.physicsWorld, mesh)
    body.updater = new THREEx.Oimo.Body2MeshUpdater(body, mesh)
    FW.bodies.push body






    #Spectrum
    @spectrum = new FW.Spectrum()

   

  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  animate : =>
    @spectrum.update()
    @iomoStats.update()
    FW.physicsWorld.step()
    for body in FW.bodies
      body.updater.update()
    @controls.update()
    delta = FW.clock.getDelta()
    FW.Renderer.render( FW.scene, FW.camera );
    THREE.AnimationHandler.update(delta)


