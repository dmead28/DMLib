DEFAULT_INPUT_DMCLASS = 'DMInput';
DEFAULT_INPUT_INPUTTYPE = 'text';

function DMInput(obj$idNum_DMClass_inputType) {
    _inputArgs = obj$idNum_DMClass_inputType;
    _inputArgs.idNum ? _idNum = _inputArgs.idNum : _idNum = DEFAULT_IDNUM();
    _inputArgs.DMClass ? _DMClass = _inputArgs.DMClass : _DMClass = DEFAULT_INPUT_DMCLASS;
    _inputArgs.inputType ? _inputType = _inputArgs.inputType : _inputType = DEFAULT_INPUT_INPUTTYPE;
    
    DMElement.call(this,{
        type: 'input',
        idNum: _idNum,
        DMClass: _DMClass
    });
    
    this.inputType = _inputType;
    this.setAttribute('type',this.inputType);
}
DMInput.prototype = subClassOf(DMElement);
function DMInputQuery(idString) {
    DMElementQuery.call(this,idString);
}
DMInputQuery.prototype = subClassOf(DMInput);

DMInput.prototype.value = function() {
    return this._element.value;
}
DMInput.prototype.setValue = function(v) {
    this._element.value = v;
}