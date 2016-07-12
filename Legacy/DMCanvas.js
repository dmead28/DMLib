function DMCanvas(obj$idNum) {
    _args = obj$idNum ? obj$idNum: new Object();
    _args.idNum ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
    
    
    DMElement.call(this,{
        type: 'canvas',
        idNum: _idNum,
        DMClass: 'DMCanvas'
    });
    
    this.init();
}
DMCanvas.prototype = subClassOf(DMElement);
function DMCanvasQuery(idString) {
    DMElementQuery.call(this,idString);
    this.init();
}
DMCanvasQuery.prototype = subClassOf(DMCanvas);
DMClassObj.DMCanvas = DMCanvasQuery;

DMCanvas.prototype.init = function() {
    //init code here
    this.innerHTML("hey")
}