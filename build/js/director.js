var Director,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.Director = Director = (function() {
  function Director() {
    this.run = __bind(this.run, this);
    this.scene1TotalTime = 10000;
    this.scene2TotalTime = 5000;
  }

  Director.prototype.initScenes = function() {
    FW.scene1 = {
      totalTime: this.scene1TotalTime,
      startTime: this.startTime,
      endTime: this.startTime + this.scene1TotalTime,
      update: function() {
        return 1 + 1;
      }
    };
    FW.scene2 = {
      totalTime: this.scene2TotalTime,
      startTime: FW.scene1.endTime,
      endTime: this.startTime + this.scene2totalTime,
      update: function() {
        return 1 + 1;
      }
    };
    this.currentScene = FW.scene2;
    return this.scene2TotalTime = 50000;
  };

  Director.prototype.startShow = function() {
    var songPosition;
    this.startTime = Date.now();
    FW.freqMap = {
      voiceStart: 400,
      voiceEnd: 600
    };
    FW.world = new FW.World();
    this.initScenes();
    songPosition = (this.currentScene.startTime - this.startTime) / 1000;
    FW.audio.source.noteGrainOn(0, 0, 1000);
    return this.run();
  };

  Director.prototype.run = function() {
    requestAnimationFrame(this.run);
    FW.audio.update();
    FW.world.animate();
    return FW.freqMap.voiceStart += .01;
  };

  return Director;

})();
