function DMRelativeWrap(obj$idNum) {
    _args = obj$idNum;
    _args.idNum ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
    
    DMElement.call(this,{
        type: 'div',
        idNum: _idNum,
        DMClass: 'relativeWrap'
    });
}
DMRelativeWrap.prototype = subClassOf(DMElement);

DMRelativeWrap.prototype.doSomething = function(_something) {
    return false;
}