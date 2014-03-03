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



  update: ->
    
        