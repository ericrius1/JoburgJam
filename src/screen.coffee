#Just hanle one screen as physics mesh
FW.Screen = class Screen
  constructor: (position)->

    @uniforms = 
      time: {type: 'f', value: 1.0}
      resolution: { type: 'v2', value: new THREE.Vector2()}
      mouse: {type: 'v2', value: new THREE.Vector2(.29, .53)}
      texture: {type: 't', value: FW.screenTexture}

    w = 1/window.innerWidth
    h = 1/window.innerHeight
    @uniforms.resolution.value.set w, h


    material = new THREE.ShaderMaterial
      uniforms: @uniforms
      vertexShader: document.getElementById('vertexShader').textContent
      fragmentShader: document.getElementById('fragmentShader1').textContent
    screenMaterial = Physijs.createMaterial \
      material
      ,.4 # low friction
      ,0.3 # high restitution (bounciness)
    
    @screen = new Physijs.BoxMesh \
      new THREE.CubeGeometry(20, 1, 20)
      ,screenMaterial
      ,0 # mass
    @screen.position = position
    FW.scene.add( @screen )
  


    
        