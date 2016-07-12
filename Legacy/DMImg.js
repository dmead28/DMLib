DEFAULT_IMG_DMCLASS = 'DMImg';

function DMImg(obj$idNum_DMClass_SRC) {
    _imgArgs = obj$idNum_DMClass_SRC;
    _imgArgs.idNum ? _idNum = _imgArgs.idNum : _idNum = DEFAULT_IDNUM();
    _imgArgs.DMClass ? _DMClass = _imgArgs.DMClass : _DMClass = DEFAULT_IMG_DMCLASS;
    _imgArgs.SRC ? _SRC = _imgArgs.SRC : alert('Error in DMImg \nSRC not defined');
    
    DMElement.call(this,{
        type: 'img',
        idNum: _idNum,
        DMClass: _DMClass
    });
    
    this.addSRC(_SRC);
    //alert('type: '+this._element.tagName+'\nidNum: '+this.getIDNum()+'\nDMClass: '+this._element.className+'\nURI: '+this.SRC);
}
DMImg.prototype = subClassOf(DMElement);

DMImg.prototype.addSRC = function(_SRC) {
    this.SRC = _SRC;
    this.setAttribute('src',this.SRC);
}
DMImg.prototype.speak = function() {
    alert('type: '+this._element.tagName+'\nidNum: '+this.getIDNum()+'\nDMClass: '+this._element.className+'\nSRC: '+this.SRC);
}