function DMtr(_idNum,_DMClass) {
    DMElement.call(this,{
        type: 'tr',
        idNum: _idNum,
        DMClass: _DMClass
    });
}
DMtr.prototype = subClassOf(DMElement);