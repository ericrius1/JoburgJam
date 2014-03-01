
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 2000
    FW.audio.masterGain.value = 1

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(45.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.z = 20
    
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
    light = new THREE.DirectionalLight( 0xaa00aa , 1 )
    light.position.set( 0 , 1 , 0 );

    FW.scene.add light

    light = new THREE.DirectionalLight( 0x44aaaa , 1 )
    light.position.set( 0 , -1 , 0 )

    FW.scene.add( light )





    # HAZE
    @haze = new FW.Haze()

    #Spectrum
    # @spectrum = new FW.Spectrum()

   

  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  animate : =>
    @haze.update()
    # @spectrum.update()
    @render()
  render : ->
    delta = FW.clock.getDelta()
    # THREE.AnimationHandler.update(delta)
    @controls.update()
    FW.Renderer.render( FW.scene, FW.camera );

