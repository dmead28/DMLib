DEFAULT_BUTTON_DMCLASS = 'DMButton';
DEFAULT_BUTTON_LABEL = 'Button';

function DMButton(obj$idNum_DMClass_label) {
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
}
DMButton.prototype = subClassOf(DMElement);
function DMButtonQuery(idString) {
    DMElementQuery.call(this,idString);
}
DMButtonQuery.prototype = subClassOf(DMButton);

DMButton.prototype.super_onClick = DMElement.prototype.onClick;
DMButton.prototype.onClick = function(_fxn,_target) {
    this.super_onClick(_fxn,_target);
    
    this.clicked = true;
    //maybe to CSS stuff here
}
DMButton.prototype.setLabel = function(_label) {
    this.label = _label;
    this.innerHTML(this.label);
}

