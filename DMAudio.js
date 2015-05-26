DEFAULT_AUDIO_DMCLASS = 'DMAudio';

function DMAudio(obj$idNum_DMClass_SRC) {
    _audioArgs = obj$idNum_DMClass_SRC;
    _audioArgs.idNum ? _idNum = _audioArgs.idNum : _idNum = DEFAULT_IDNUM();
    _audioArgs.DMClass ? _DMClass = _audioArgs.DMClass : _DMClass = DEFAULT_AUDIO_DMCLASS;
    _audioArgs.SRC ? _SRC = _audioArgs.SRC : alert('Error in DMAudio \nSRC not defined');
    
    DMElement.call(this,{
        type: 'audio',
        idNum: _idNum,
        DMClass: _DMClass
    });
    
    this.addSRC(_SRC);
    //alert('type: '+this._element.tagName+'\nidNum: '+this.getIDNum()+'\nDMClass: '+this._element.className+'\nURI: '+this.SRC);
    
    this.PLAYING = false;
}
DMAudio.prototype = subClassOf(DMElement);

DMAudio.prototype.addSRC = function(_SRC) {
    this.SRC = _SRC;
    this.setAttribute('src',this.SRC);
}
DMAudio.prototype.play = function() {
    this._element.play();
    this.PLAYING = true;
}
DMAudio.prototype.pause = function() {
    this._element.pause();
    this.PLAYING = false;
}
DMAudio.prototype.stop = function() {
    this._element.pause();
    this._element.currentTime = 0;
    this.PLAYING = false;
}







