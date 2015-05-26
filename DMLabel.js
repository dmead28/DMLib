
DEFAULT_DMLABEL_TEXT = 'Label';
DEFAULT_DMLABEL_DMCLASS = 'DMLabel';

function DMLabel(obj$text$idNum) {
    _args = obj$text$idNum;
    _args.idNum ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
    _args.DMClass ? _DMClass = _args.DMClass : _DMClass = DEFAULT_DMLABEL_DMCLASS;
    _args.text ? _text = _args.text : _idNum = DEFAULT_DMLABEL_TEXT;
    
    this.text = _text;
    
    DMElement.call(this,{
        type: 'div',
        idNum: _idNum,
        DMClass: _DMClass
    });
    
    this.innerHTML(this.text);
}
DMLabel.prototype = subClassOf(DMElement);
function DMLabelQuery(idString) {
    DMElementQuery.call(this,idString);
}
DMLabelQuery.prototype = subClassOf(DMLabel);

DMLabel.prototype.value = function() {
    return this._element.value;
}

function DMString(text) {
    
    DMElement.call(this,{
        type: 'div',
        idNum: DEFAULT_IDNUM(),
        DMClass: "DMString"
    });
    this.innerHTML(text);
}
DMString.prototype = subClassOf(DMElement);

function DMRow(text) {
    
    DMElement.call(this,{
        type: 'tr',
        idNum: DEFAULT_IDNUM(),
        DMClass: "DMRow"
    });
    this.innerHTML(text);
}
DMRow.prototype = subClassOf(DMElement);