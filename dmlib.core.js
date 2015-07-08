//Made by Doug Mead

//OOP

//*object associating all constructors with string representations
var _cls = new Object() //DMClassObj stores all classes to a string representing their name. Ie, DMClassObj['Box'] = Box

//*DMObj, the king object
function DMObj() {}
DMObj.prototype.main = function(){}
_cls["DMObj"] = DMObj

//*dm functions
function dm(_id,_args) {
    if (document.getElementById(_id) != undefined) {
        _element = document.getElementById(_id);
    } else {
        alert("Error: id not found\nid: "+_id+"\nargs: "+_args+"")
    }
    _DMClass = _element.getAttribute("class") ? _element.getAttribute("class") : "DMElement";
    
    if (_cls[_DMClass] != undefined) {
        var classFunc = _cls[_DMClass]
    } else {
        var classFunc = _cls["DMElement"]
    }
    
    var _newObj = new classFunc()
    _newObj.query(_id)
    _args != undefined ? _newObj.main(_args) : _newObj.main()
    
    return _newObj
}
dm.method = function(DMClass, methodStr, newMethod) {
    _cls[DMClass].prototype[methodStr] = newMethod
}
//**creates an empty class in the _cls object
dm.createClass = function(_dmcString) {
    _cls[_dmcString] = function() {}
    return _cls[_dmcString]
}
dm.cast = function(_id,_toDMClass) {
    _newObj = new _cls[_toDMClass]
    _newObj.query(_id)
    
    return _newObj
}
dm.proto = function(_DMClass) {
    dm.createClass(_DMClass)
    dm.extend(_DMClass,"DMElement")
    _cls[_DMClass].innerHTMLString = document.getElementById(_DMClass).innerHTML
    _cls[_DMClass].prototype.make = function(_args) {
        DMElement.prototype.make.call(this,{
            DMClass: _DMClass,
            type: _args.type,
            idNum: _args.idNum
        })
        _currentIDNum = this.getIDNum()
        _currentIDNumString = "_" + _currentIDNum + ""
        
        this.innerHTML(_cls[_DMClass].innerHTMLString.replace(/_##/g,_currentIDNumString))
        
        ProtoArea.appendChild(this)
    }
    
    return dmc(_DMClass)
}
//**dmc (for DMClass) returns the constructor for it's string representation
dmc = function(_DMClass) { 
    return _cls[_DMClass]
}
//**alternate way of calling dmc()
dm.dmc = function(_DMClass) {
    return dmc(_DMClass)
}
//**creates new instance of _DMClass and runs the init() method with or without arguments
_new = function(_DMClass,_args) {
    var classFunc = _cls[_DMClass]
    
    var _newObj = new classFunc()
    
    if (_args != undefined) {
        _newObj.make(_args)
        _newObj.main(_args)
    } else {
        _newObj.make({
            DMClass: _DMClass
        })
        _newObj.main()
    }
    
    return _newObj
}
//**alternate for dm._new
dm._new = function(_DMClass,_args) {
    _new(_DMClass,_args)
}
//**subclasses. uses the subClass method for legacy support
dm.extend = function(_DMClass,_from) {
    function _subclass() {};
    _subclass.prototype = _cls[_from].prototype;
    _cls[_DMClass].prototype = new _subclass
    
    return _cls[_DMClass]
}
//**casting
dm.cast = function(_idString,_DMClass) {
    newCast = new _cls[_DMClass]()
    newCast.query(_idString)
    return newCast
}
//**superclass
dm.superMethod = function(_DMClass, _method) {
    alert("deprecated.. doesn't save time or space, and takes more processing")
    return dmc(_DMClass).prototype[_method]
}
//*subclass function for legacy support
function subClass(classA,fromClassB) {
    function _subclass() {};
    _subclass.prototype = fromClassB.prototype;
    classA.prototype = new _subclass
    return classA
}


//DMElement
//*SETTING DEFAULTS
var lastIdNum = null;
DEFAULT_IDNUM = function() {
    d = new Date();
    newIdNum = d.getTime();
    if (newIdNum==lastIdNum) newIdNum++;
    lastIdNum = newIdNum;
    return newIdNum;
}
DEFAULT_TEXT = ""
DEFAULT_DMCLASS = "DMElement"
DEFAULT_TYPE = "div"

//*CONSTRUCTOR and OOP done manually (the version 0 way)
function DMElement() {}
_cls["DMElement"] = DMElement
dm.extend("DMElement","DMObj")

//*THREE INITIAL methods done incorrectly (quick fix for compatibility)
DMElement.prototype.make = function(obj$type_idNum_DMClass) {
    _args = obj$type_idNum_DMClass
    if (_args != undefined) {
        if (_args.type || _args.idNum || _args.DMClass) {
            _args.type    ? _type = _args.type : _type = DEFAULT_TYPE;
            _args.idNum   ? _idNum = _args.idNum : _idNum = DEFAULT_IDNUM();
            _args.DMClass ? _DMClass = _args.DMClass : _DMClass = DEFAULT_DMCLASS;
            
            this._element = document.createElement(_type);
            this.setDMClass(_DMClass);
            this.idNum = _idNum;
            
            this.setID(this.DMClass+'_'+this.idNum);
            
            this.innerHTML(DEFAULT_TEXT);
        }  else {
            alert('Error in DMElement constructor:\n Arguments not properly defined.\n args='+_args+'\nPOSSIBLE SOLUTION: use query constructor');
        }
    } else {
        _type = DEFAULT_TYPE;
        _idNum = DEFAULT_IDNUM();
        _DMClass = DEFAULT_DMCLASS;
        this._element = document.createElement(_type);
        this.setDMClass(_DMClass);
        this.idNum = _idNum;
        this.setID(this.DMClass+'_'+this.idNum);
        this.innerHTML(DEFAULT_TEXT);
    }
}
DMElement.prototype.query = function(_id) {
    this._element = document.getElementById(_id);
    this._DMClass = this._element.className;
    this.setDMClass(this._DMClass);
    
    this.idNum = '';
}
DMElement.prototype.main = function() {
    console.log("DMElement.main() and id: "+this.getID())
    DMRegistry.add({id: this.getID(), DMElement: this}) //old. need to rework this. still has some dependencies
}
//*METHODS wrapping HTMLElement methods
DMElement.prototype.element = function() {return this._element}
DMElement.prototype.innerHTML = function(_innerHTML) {
    if (_innerHTML != undefined) {
        this._element.innerHTML = _innerHTML;
    }
    return this._element.innerHTML;
}
DMElement.prototype.appendChild = function(_newChildDM) {
    newChild = _newChildDM._element;
    this._element.appendChild(newChild);
}
DMElement.prototype.addRelativeWrap = function() { //addRelativeWrap() makes manipulating the position of child elements easier
    //needs to actually add the relative wrap
    this.style().position = "relative"
}
DMElement.prototype.add = function(_newDMEChild) { //adds to relativeWrap
    if (_newDMEChild.style().position != "absolute") {_newDMEChild._element.style.position = "absolute"}
    this.appendChild(_newDMEChild) //needs to add to the relative wrap
};
DMElement.prototype.speak = function() {
    alert("DMElement: "+this.getID())
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
DMElement.prototype.style = function() {
    return this._element.style
}
DMElement.prototype.hide = function() {
    this.originalDisplayStyle = this._element.style.display;
    this._element.style.display = 'none';
}
DMElement.prototype.show = function() {
    this._element.style.display = this.originalDisplayStyle;
}
DMElement.prototype.setDMClass = function(_DMClass) {
    this.DMClass = _DMClass;
    this.setAttribute('class',_DMClass);
}
DMElement.prototype.addNewClass = function(_DMAddClass) {
    this.setAttribute('class',this.DMClass+' '+_DMAddClass);
}
DMElement.prototype.getDMClass = function() { //gets JUST the first class (the DMClass) which is the constructer
    return this.DMClass;
}
DMElement.prototype.setIDNum = function(_idNum) {
    this.setID(_idNum + this.DMClass)
}
DMElement.prototype.setID = function(_id) {
    console.log('DMElement.setID() running. Has not been properly debugged');
    if (this.getID() == undefined) {
        this.setAttribute('id',_id);
    } else {
        this.setAttribute('id',_id);
        DMRegistry.replaceID({
            newID: _id,
            oldID: this.getID()
        });
    }
}
DMElement.prototype.getID = function() {
    return this.getAttribute('id');
}
DMElement.prototype.getIDNum = function() {
    _myID = this.getAttribute('id');
    _myIDArr = _myID.split('_');
    this.IDNum = _myIDArr[1];
    return this.IDNum;
}
//*EVENTS
DMClickArr = new Array()
DMElement.prototype.addEventListener = function(_type,_listener,_useCapture) {
    this._element.addEventListener(_type,_listener,_useCapture);
}
DMElement.prototype.onClick = function(fxn,_delegate) {
    if (_delegate == undefined) {
        clickDMElement = this
        clickDMElement.target = this
    } else {
        clickDMElement = _delegate
        clickDMElement.target = this
    }
    clickID = this.getID();
    DMClickArr.push({ID: clickID, DMTarget: clickDMElement, clickFxn: fxn});
    this.addEventListener('click',function(e) {
        testID = e.target.getAttribute('id');
        for (i=0;i<DMClickArr.length;i++) {
            currentClickObj = DMClickArr[i];
            currentID = currentClickObj.ID;
            if (currentID==testID) {
                currentDMElement = currentClickObj.DMTarget;
                currentDMElement.e = e;
                currentFxn = currentClickObj.clickFxn;
                currentFxn(currentDMElement);
                break;
            }
        }
    });
}

//DMRegistry
//old. need to rework this. still has dependencies
function DMRegistry() {
    //should use database at some point.. probably once i know it's compatible at work
    this._arr = new Array();
}
    DMRegistry.prototype.add = function(obj$id_DMElement) {
        //add bug catchers
        this._arr.push(obj$id_DMElement);
        index = this._arr.length - 1;
        
        return index;
    }
    DMRegistry.prototype.findDMElement = function(_id) {
        //searches for _id and returns the DMElement
        //console.log('DMRegistry.findDMElement(_id) has not yet been debugged. May not even work');
        //add bug catchers
        outputDMElement = null;
        
        for (i=0;i<this._arr.length;i++) {
            currentID = this._arr[i].id;
            currentDMElement = this._arr[i].DMElement;
            
            if (_id==currentID) {
                outputDMElement = currentDMElement;
                break;
            }
        }
        
        if (outputDMElement == null) {
            console.log('DMRegistry.findDMElement() did not find object with id: '+_id);
            return false;
        } else {
            return outputDMElement;
        }
    }
    DMRegistry.prototype.find = function(_id) {
        //searches for _id and returns the whole obj {index, id, DMElement}
        //add bug catchers
        outputObj = null;
        
        for (i=0;i<this._arr.length;i++) {
            currentID = this._arr[i].id;
            currentDMElement = this._arr[i].DMElement;
            
            if (_id==currentID) {
                outputObj = {
                    index: i,
                    id: currentID,
                    DMElement: currentDMElement
                };
                break;
            }
        }
        
        if (outputObj == null) {
            console.log('DMRegistry.find() did not find object with id: '+_id);
            return false;
        } else {
            return outputObj;
        }
    }
    DMRegistry.prototype.replaceID = function(obj$newID_oldID) {
        //add bug catchers
        oldID = obj$newID_oldID.oldID;
        newID = obj$newID_oldID.newID;
        
        oldObj = this.find(oldID);
        
        if (oldObj) {
            this._arr[oldObj.index].id = newID;
            return newID;
        } else {
            return false;
        }
    }
    DMRegistry.prototype.set = function(obj$index_id_DMElement) {
        //add bug catchers
        _index = obj$index_id_DMElement.index;
        _id = obj$index_id_DMElement.id;
        _DMElement = obj$index_id_DMElement.DMElement;
        
        this._arr[_index] = {id: _id, DMElement: _DMElement};
    }
var DMRegistry = new DMRegistry()