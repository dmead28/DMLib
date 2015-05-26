function DMButtonQuery(obj$idNum_DMClass_label) {
    /*
    _args = obj$idNum_DMClass_label;
    _args.idNum ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
    _args.DMClass ? _DMClass = _args.DMClass : _DMClass = DEFAULT_INPUT_DMCLASS;
    _args.label ? _label = _args.label : _label = DEFAULT_BUTTON_LABEL;
    
    
    DMElement.call(this,{
        type: 'a',
        idNum: _idNum,
        DMClass: _DMClass
    });
    
    this.setLabel(_label);
    
    this._element.style.cursor = 'pointer';
    */
}
DMButtonQuery.prototype = subClassOf(DMButton);
/*
DMButtonQuery.prototype.super_onClick = DMElement.prototype.onClick;
DMButtonQuery.prototype.onClick = function(_fxn,_whatBecomes_DMe) {
    this.super_onClick(_fxn,_whatBecomes_DMe);
    
    this.clicked = true;
    //maybe to CSS stuff here
}
DMButtonQuery.prototype.setLabel = function(_label) {
    this.label = _label;
    this.innerHTML(this.label);
}
*/
