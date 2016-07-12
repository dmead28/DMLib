function DMScroller(obj$idNum) {
    _args = obj$idNum ? obj$idNum: new Object();
    _args.idNum ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
    
    
    DMElement.call(this,{
        type: 'div',
        idNum: _idNum,
        DMClass: 'DMScroller'
    });
    
    this.init();
}
DMScroller.prototype = subClassOf(DMElement);
function DMScrollerQuery(idString) {
    DMElementQuery.call(this,idString);
    this.init();
}
DMScrollerQuery.prototype = subClassOf(DMScroller);
DMClassObj.DMScroller = DMScrollerQuery;

DMScroller.prototype.init = function() {
    this.newLeft = 0;
    this.MImages = [];
    
    this.clearMImage = new MImage({});
    this.clearMImage.addDMClass('clear');
    //this.clearMImage.setColor('clear');
    this.clearMImage.innerHTML('clearMImage');
    
    this.clearMImage._element.style.left = this.newLeft+'px';
    this.newLeft = this.newLeft + MAX_LEFT_INT;
    this.appendChild(this.clearMImage);
    this.clearMImage.onClick(function(DMe){
        console.log('clearMImage onclick');
        onSingleSnap(DMe);
    },this.clearMImage);
}
DMScroller.prototype.addMImage = function(_MImage) {
    if (_MImage.innerHTML()=='') _MImage.innerHTML('Number: '+_MImage.getIDNum());
    this.clearMImage._element.style.left = this.newLeft+'px';
    _MImage._element.style.left = this.newLeft-500+'px';;
    this.newLeft = this.newLeft + MAX_LEFT_INT;
    this.appendChild(_MImage); //maybe prepend or .before so that the order in the DOM matches the px
}
DMScroller.prototype.makeDraggable = function() {
    currentID = this.getID();
    $('#'+currentID+'').draggable({
        axis: 'x',
        stop: function(event, ui) {
            left = $('#'+event.target.getAttribute('id')+'').offset().left;
            leftInt = parseInt(left);
            leftIntAbs = Math.abs(leftInt);
            
            remainder = leftIntAbs%500;
            newLeftIntAbs = remainder<250 ? leftIntAbs - remainder : leftIntAbs - remainder + 500;
            
            newLeftInt = leftInt > 0 ? newLeftIntAbs : -newLeftIntAbs;
            
            console.log('Left: '+left+'\nRemainder: '+remainder+'\nnewLeftInt: '+newLeftInt);
            
            $('#'+event.target.getAttribute('id')+'').css({left: newLeftInt+'px'});
        }
    });
}
DMScroller.prototype.loadFakeData = function() {
    /*
    newLeft = 500;
    
    for (j=0; j<2; j++) {
        this.addMImage(new MImage({
            idNum: j+this.getIDNum()
        }));
    }
    */
}



