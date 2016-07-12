DEFAULT_TYPE = 'div';

lastIdNum = null;
DEFAULT_IDNUM = function() {
    d = new Date();
    newIdNum = d.getTime();
    if (newIdNum==lastIdNum) newIdNum++;
    lastIdNum = newIdNum;
    return newIdNum;
}
DEFAULT_DMCLASS = 'DefaultClass';

DEFAULT_TEXT = '';

//probably should make this into a DMRegistry object.. probably will need to modify DMRegistry
DMClickArr = new Array();
DMSwipeArr = new Array();

DMRegistry = new DMRegistry();

//DMElement
function DMElement(obj$type_idNum_DMClass$id) {
    _args = obj$type_idNum_DMClass$id;
    if (_args == undefined) {
        _args = {createDefault: true};
    }
    if (_args.type || _args.idNum || _args.DMClass) {
        _args.type    ? _type = _args.type : _type = DEFAULT_TYPE;
        _args.idNum   ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
        _args.DMClass ? _DMClass = _args.DMClass : _DMClass = DEFAULT_DMCLASS;
        
        this._element = document.createElement(_type);
        this.setDMClass(_DMClass);
        this.idNum = _idNum;
        
        this.setID(this.DMClass+'_'+this.idNum);
        
        this.innerHTML(DEFAULT_TEXT);
    } else if (_args.id){
        //add code to split id into idNum and DMClass. for now, it'll just be used for getting
        //elements with simple names
        this._element = document.getElementById(_args.id);
        
        _DMClass = this._element.className;
        this.setDMClass(_DMClass);
        
        _type = this._element.tagName.toLowerCase();
        
        this.idNum = '';
    } else if (_args.createDefault) {
        _type = DEFAULT_TYPE;
        _idNum = DEFAULT_IDNUM();
        _DMClass = DEFAULT_DMCLASS;
        
        this._element = document.createElement(_type);
        this.setDMClass(_DMClass);
        this.idNum = _idNum;
        
        this.setID(this.DMClass+'_'+this.idNum);
        
        this.innerHTML(DEFAULT_TEXT);
    } else {
        alert('Error in DMElement constructor:\n Arguments not properly defined.\n args='+_args+'\nPOSSIBLE SOLUTION: use query constructor');
    }
    
    DMRegistry.add({id: this.getID(), DMElement: this});
}
function DMElementQuery(idString) {
    DMElement.call(this,{
        id: idString
    });
}
DMElementQuery.prototype = subClassOf(DMElement);

DMElement.prototype.getElement = function() {
    return this._element;
}
DMElement.prototype.innerHTML = function(_innerHTML) {
    if (_innerHTML != null) {
        this._element.innerHTML = _innerHTML;
    }
    return this._element.innerHTML;
}
DMElement.prototype.appendChild = function(_newChildDM) {
    newChild = _newChildDM._element;
    this._element.appendChild(newChild);
}
DMElement.prototype.parentNode = function() {
    return this._element.parentNode;
}
DMElement.prototype.getParent = function() {
    _parentNode = this.parentNode();
    _parentNode_id = _parentNode.getAttribute('id');
    _parentDMElement = DMRegistry.findDMElement(_parentNode_id);
    
    return _parentDMElement;
}
DMElement.prototype.childNodes = function() {
    return this._element.childNodes;
}
DMElement.prototype.getChildren = function() {
    _childNodes = this.childNodes();
    _childrenArr = new Array();
    
    for (r=0;r<_childNodes.length;r++) {
        _currentNode = _childNodes[r];
        _currentNode_id = _currentNode.getAttribute('id');
        _currentDMElement = DMRegistry.findDMElement(_currentNode_id);
        
        _childrenArr[r] = _currentDMElement;
    }
    
    return _childrenArr;
}
DMElement.prototype.setAttribute = function(name,value) {
    this._element.setAttribute(name,value);
}
DMElement.prototype.getAttribute = function(name) {
    return this._element.getAttribute(name);
}
DMElement.prototype.nextSibling = function() {
    return this._element.nextSibling;
}
DMElement.prototype.after = function(_DMElementAfter) {
    parentElement = _DMElementAfter.parentNode();
    parentElement.insertBefore(this._element, _DMElementAfter.nextSibling());
}
DMElement.prototype.before = function(_DMElementBefore) {
    parentElement = _DMElementBefore.parentNode();
    parentElement.insertBefore(this._element, _DMElementBefore._element);
}
DMElement.prototype.hide = function() {
    this.originalDisplayStyle = this._element.style.display;
    this._element.style.display = 'none';
}
DMElement.prototype.show = function() {
    //alert('showing');
    this._element.style.display = this.originalDisplayStyle;
}
DMElement.prototype.setDMClass = function(_DMClass) {
    this.DMClass = _DMClass;
    this.setAttribute('class',_DMClass);
}
DMElement.prototype.addOKNClass = function(_DMAddClass) {
    this.addDMClass(_DMAddClass);
    console.log('DMElement.addOKNClass is deprecated.. use addDMClass');
}
DMElement.prototype.addDMClass = function(_DMAddClass) {
    this.setDMClass(this.DMClass+" "+_DMAddClass);
}
DMElement.prototype.addSecondDMClass = function(_DMAddClass) {
    this.setAttribute('class',this.DMClass+' '+_DMAddClass);
}
DMElement.prototype.setID = function(_id) {
    //console.log('DMElement.setID() running. Has not been properly debugged');
    oldID = this.getID();
    //alert('setID called with oldID: '+oldID);
    
    if (oldID==null) {
        this.setAttribute('id',_id);
    } else {
        this.setAttribute('id',_id);
        newID = this.getID();
        DMRegistry.replaceID({
            newID: newID,
            oldID: oldID
        });
    }
}
DMElement.prototype.getID = function() {
    return this.getAttribute('id');
}
DMElement.prototype.setLevel = function(_level) {
    this.level = _level;
    this.setAttribute('class',this.DMClass+" L"+_level);
}
DMElement.prototype.getLevel = function() {
    return this.level;
}
DMElement.prototype.addEventListener = function(_type,_listener,_useCapture) {
    this._element.addEventListener(_type,_listener,_useCapture);
}
DMElement.prototype.onClick = function(_fxn,_whatBecomes_DMe) {
    _whatBecomes_DMe != undefined ? _clickDMElement=_whatBecomes_DMe : _clickDMElement = this;
    
    _clickID = this.getID();
    DMClickArr.push({ID: _clickID, clickDMElement: _clickDMElement, clickFxn: _fxn});
    
    this.addEventListener('click',function(e) {
        testID = e.target.getAttribute('id');
        for (i=0;i<DMClickArr.length;i++) {
            currentClickObj = DMClickArr[i];
            currentID = currentClickObj.ID;
            if (currentID==testID) {
                currentDMElement = currentClickObj.clickDMElement;
                currentDMElement.e = e;
                currentFxn = currentClickObj.clickFxn;
                currentFxn(currentDMElement);
                break;
            }
        }
    });
}
DMElement.prototype.on = function(_eventName,_fxn,_whatBecomes_DMe) {
    _whatBecomes_DMe != undefined ? _clickDMElement=_whatBecomes_DMe : _clickDMElement = this;
    
    _clickID = this.getID();
    DMClickArr.push({ID: _clickID, clickDMElement: _clickDMElement, clickFxn: _fxn});
    
    this.addEventListener(_eventName,function(e) {
        testID = e.target.getAttribute('id');
        for (i=0;i<DMClickArr.length;i++) {
            currentClickObj = DMClickArr[i];
            currentID = currentClickObj.ID;
            if (currentID==testID) {
                currentDMElement = currentClickObj.clickDMElement;
                currentDMElement.e = e;
                currentFxn = currentClickObj.clickFxn;
                currentFxn(currentDMElement);
                break;
            }
        }
    });
}
/*
DMElement.prototype.onTap = function(_fxn,_whatBecomes_DMe) {
    _whatBecomes_DMe != undefined ? _clickDMElement=_whatBecomes_DMe : _clickDMElement = this;
    
    _clickID = this.getID();
    DMSwipeArr.push({ID: _clickID, clickDMElement: _clickDMElement, clickFxn: _fxn});
    
    alert(this._element.getAttribute('id'))
    this.hammerTap = new Hammer(this._element);
    this.hammerTap.foo = 'hey';
    this.hammerTap.on('tap',function(e){
        testID = e.target.getAttribute('id');
        for (i=0;i<DMSwipeArr.length;i++) {
            currentClickObj = DMSwipeArr[i];
            currentID = currentClickObj.ID;
            if (currentID==testID) {
                currentDMElement = currentClickObj.clickDMElement;
                currentDMElement.e = e;
                currentFxn = currentClickObj.clickFxn;
                currentFxn(currentDMElement);
                break;
            }
        }
    });
}
DMElement.prototype.onSwipe = function(_fxn,_whatBecomes_DMe) {
    _whatBecomes_DMe != undefined ? _clickDMElement=_whatBecomes_DMe : _clickDMElement = this;
    
    _clickID = this.getID();
    DMSwipeArr.push({ID: _clickID, clickDMElement: _clickDMElement, clickFxn: _fxn});
    
    this.hammerSwipe = new Hammer(this._element);
    this.hammerSwipe.on('swipe',function(e){
        testID = e.target.getAttribute('id');
        for (i=0;i<DMSwipeArr.length;i++) {
            currentClickObj = DMSwipeArr[i];
            currentID = currentClickObj.ID;
            if (currentID==testID) {
                currentDMElement = currentClickObj.clickDMElement;
                currentDMElement.e = e;
                currentFxn = currentClickObj.clickFxn;
                currentFxn(currentDMElement);
                break;
            }
        }
    });
}
*/
//getIDNum()
DMElement.prototype.getIDNum = function() {
    _myID = this.getAttribute('id');
    _myIDArr = _myID.split('_');
    this.IDNum = _myIDArr[1];
    
    return this.IDNum;
}
//addRelativeWrap()
DMElement.prototype.addRelativeWrap = function() {
    this.DMRelativeWrap = new DMRelativeWrap({idNum: this.getID()});
    this.appendChild(this.DMRelativeWrap);
}
//add(_newDMEChild) //only when above is defined
DMElement.prototype.add = function(_newDMEChild) {
    if (this.DMRelativeWrap == undefined) {alert('Error: cannot use DMElement.add() without adding RelativeWrap');}
    this.DMRelativeWrap.appendChild(_newDMEChild);
};
DMElement.prototype.createChild = function(obj$DMEObj_addBOOL) {
    _newChild = new DMElement({
        type: obj$DMEObj.type,
        idNum: obj$DMEObj.idNum,
        DMClass: obj$DMEObj.DMClass
    });
    this.DMRelativeWrap == undefined ? this.add(_newChild) : this.appendChild(_newChild);
}

DMElement.prototype.makeQueryable = function() {
    DMClassObj.push({
        name: this.DMClass,
        init: this
    });
}

//*****************
//****DEPRECATED***
//*****************


//setElementById()
DMElement.prototype.setElementById = function(_getID) {
    alert('DMElement.setElementById() should be deprecated');
    this._element = document.getElementById(_getID);
}