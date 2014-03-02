
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

    @initStats()


    #PHYSICS
    Physijs.scripts.worker = '/lib/physijs/physijs_worker.js';
    Physijs.scripts.ammo = '/lib/physijs/ammo.js';
    # SCENE 
    FW.scene = new Physijs.Scene()
    # FW.scene.add @controls.animationParent

    

    @initSceneObjects()
    
 
    
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
  
    #Spectrum
    @spectrum = new FW.Spectrum()

    #POPCORN
    @popcorn = new FW.Popcorn()

   

  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  animate : =>
    @spectrum.update()
    @popcorn.update()
    @controls.update()
    delta = FW.clock.getDelta()
    FW.Renderer.render( FW.scene, FW.camera );
    THREE.AnimationHandler.update(delta)

  initStats: ->
    render_stats = new Stats();
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '0px';
    render_stats.domElement.style.zIndex = 100;
    document.body.appendChild( render_stats.domElement );
    
    physics_stats = new Stats();
    physics_stats.domElement.style.position = 'absolute';
    physics_stats.domElement.style.top = '50px';
    physics_stats.domElement.style.zIndex = 100;
    document.body.appendChild( physics_stats.domElement );


