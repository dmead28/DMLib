function DMCFadeIn(obj$idNum) {
    _args = obj$idNum ? obj$idNum: new Object();
    _args.idNum ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
    
    
    DMElement.call(this,{
        type: 'div',
        idNum: _idNum,
        DMClass: 'DMCFadeIn'
    });
    
    this.init();
}
DMCFadeIn.prototype = subClassOf(DMElement);
function DMCFadeInQuery(idString) {
    DMElementQuery.call(this,idString);
    this.init();
}
DMCFadeInQuery.prototype = subClassOf(DMCFadeIn);
DMClassObj.DMCFadeIn = DMCFadeInQuery;

DMCFadeIn.prototype.init = function() {
    //init code here
    
}