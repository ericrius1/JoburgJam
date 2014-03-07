FW.Screens = class Screens
  constructor: ->

    @startTime = Date.now()
  

    @uniforms = 
      time: {type: 'f', value: 1.0}
      resolution: { type: 'v2', value: new THREE.Vector2()}
      mouse: {type: 'v2', value: new THREE.Vector2(.29, .53)}
      texture: {type: 't', value: @texture}

    w = 1/window.innerWidth
    h = window.innerHeight
    @uniforms.resolution.value.set w, h

    material1 = new THREE.ShaderMaterial
      uniforms: @uniforms
      vertexShader: document.getElementById('vertexShader').textContent
      fragmentShader: document.getElementById('fragmentShader2').textContent

    material2 = new THREE.ShaderMaterial
      uniforms: @uniforms
      vertexShader: document.getElementById('vertexShader').textContent
      fragmentShader: document.getElementById('fragmentShader1').textContent

    geo = new THREE.CubeGeometry 20, 1, 20
    mesh = new THREE.Mesh geo, material1
    FW.scene.add mesh 

    mesh = new THREE.Mesh geo, material2
    mesh.position.set -20, 0, 0
    FW.scene.add mesh


    document.onmousemove =  (e)=>
      x = e.pageX/window.innerWidth
      y = e.pageY/window.innerHeight
      # @uniforms.mouse.value.x = x
      # @uniforms.mouse.value.y = y
      console.log 'x', x
      console.log 'y', y

 
