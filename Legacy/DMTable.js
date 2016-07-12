function DMTable(_idNum,_DMClass) {
    DMElement.call(this,{
        type: 'table',
        idNum: _idNum,
        DMClass: _DMClass
    });
}
DMTable.prototype = subClassOf(DMElement);