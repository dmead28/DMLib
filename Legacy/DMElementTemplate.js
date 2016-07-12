/*
function $$$(obj$idNum) {
    _args = obj$idNum ? obj$idNum: new Object();
    _args.idNum ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
    
    
    DMElement.call(this,{
        type: 'div',
        idNum: _idNum,
        DMClass: '$$$'
    });
    
    this.init();
}
$$$.prototype = subClassOf(DMElement);
function $$$Query(idString) {
    DMElementQuery.call(this,idString);
    this.init();
}
$$$Query.prototype = subClassOf($$$);
DMClassObj.$$$ = $$$Query;

$$$.prototype.init = function() {
    //init code here
}
*/