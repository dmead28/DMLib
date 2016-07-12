DEFAULT_DMBA_DMClass = 'DMButtonArea'

function DMButtonArea(obj$idNum_DMClass) {
    _args = obj$idNum_DMClass;
    _args.idNum ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
    _args.DMClass ? _DMClass = _args.DMClass : _DMClass = DEFAULT_DMBA_DMClass;
    
    DMElement.call(this,{
        type: 'div',
        idNum: _idNum,
        DMClass: _DMClass
    });
    
    this.addRelativeWrap();
}
DMButtonArea.prototype = subClassOf(DMElement);
/*
DMButtonArea.prototype.addDMButton = function(_DMButton) {
    this.add(_DMButton);
}
*/