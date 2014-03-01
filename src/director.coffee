FW.Director = class Director
  constructor: ->
    @scene1TotalTime = 10000
    @scene2TotalTime = 5000


  initScenes: ->
    FW.scene1 = 
      totalTime: @scene1TotalTime
      startTime: @startTime
      endTime: @startTime + @scene1TotalTime
      update: -> 1 + 1
    FW.scene2 = 
      totalTime: @scene2TotalTime
      startTime: FW.scene1.endTime
      endTime: @startTime + @scene2totalTime
      update: -> 1+1


    @currentScene = FW.scene2
    @scene2TotalTime = 50000

  startShow: ->
    @startTime = Date.now()
    FW.freqMap =
      voiceStart: 400
      voiceEnd: 600

    FW.world = new FW.World()
    @initScenes()
    #find elapsed time between our current time and start time to play song in right place
    songPosition = (@currentScene.startTime - @startTime)/1000
    # FW.audio.source.noteGrainOn(0, songPosition, 1000)

    @run()


  run: =>
    requestAnimationFrame @run
    FW.audio.update()
    FW.world.animate()
    # @currentScene.update()

    FW.freqMap.voiceStart+=.01




