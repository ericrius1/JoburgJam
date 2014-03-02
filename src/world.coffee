
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

    @controls = new THREE.TrackballControls(FW.camera)

    @controls.rotateSpeed = 1.0;
    @controls.zoomSpeed = 1.2;
    @controls.panSpeed = 0.8;

    @controls.noZoom = false;
    @controls.noPan = false;

    @controls.staticMoving = true;
    @controls.dynamicDampingFactor = 0.3;

    @initStats()

    #PHYSICS
    Physijs.scripts.worker = '/lib/physijs/physijs_worker.js';
    Physijs.scripts.ammo = '/lib/physijs/ammo.js';
    # SCENE 
    FW.scene = new Physijs.Scene()
    FW.scene.addEventListener 'update', =>
      # args: timestep, maxSubsteps
      FW.scene.simulate undefined, 1
      @physics_stats.update()
    @initSceneObjects()
    
 
    
    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer({antialias: true})
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false

    FW.scene.simulate()

  initSceneObjects: ->
  
    #GROUND
    ground_material = Physijs.createMaterial \
      new THREE.MeshNormalMaterial()
      ,.8 # high friction
      ,.3 # low restitution
    
    ground = new Physijs.BoxMesh \
      new THREE.CubeGeometry(100, 1, 100)
      ,ground_material
      ,0 # mass
    ground.receiveShadow = true
    FW.scene.add( ground )

    #Spectrum
    @spectrum = new FW.Spectrum()

    #POPCORN
    @popcorn = new FW.Popcorn()

    @spawnBox()

  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  render : =>
    @spectrum.update()
    @popcorn.update()
    @controls.update()
    @render_stats.update()
    delta = FW.clock.getDelta()
    FW.Renderer.render( FW.scene, FW.camera );

  initStats: ->
    @render_stats = new Stats();
    @render_stats.domElement.style.position = 'absolute';
    @render_stats.domElement.style.top = '0px';
    @render_stats.domElement.style.zIndex = 100;
    document.body.appendChild( @render_stats.domElement );
    
    @physics_stats = new Stats();
    @physics_stats.domElement.style.position = 'absolute';
    @physics_stats.domElement.style.top = '50px';
    @physics_stats.domElement.style.zIndex = 100;
    document.body.appendChild( @physics_stats.domElement );

  spawnBox: =>
    box_geometry = new THREE.CubeGeometry(4, 4, 4)
    handleCollision = (collided_with, linearVelocity, angularVelocity)->
    material = Physijs.createMaterial \
      new THREE.MeshNormalMaterial()
      , .6 # medium restitution
      , .3 # low restitution
    box = new Physijs.BoxMesh box_geometry, material
    box.position.set Math.random() * 15 -7.5, 25, Math.random() * 15 - 7.5
    box.addEventListener 'collision', handleCollision
    FW.scene.add box
    setTimeout =>
      @spawnBox()
    , 1000


