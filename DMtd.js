function DMtd(_idNum,_DMClass) {
    DMElement.call(this,{
        type: 'td',
        idNum: _idNum,
        DMClass: _DMClass
    });
}
DMtd.prototype = subClassOf(DMElement);