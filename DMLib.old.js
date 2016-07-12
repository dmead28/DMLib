//Douglas Mead's Library
//DMLib.js
//DMLib main file

//Also includes:
//  DMElement.js
//      DMTable.js
//          DMtr.js
//          DMtd.js

//OOP
function subClassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};

//OOP - new
function _new(obj$DMClass_args) {
    DMClass = obj$DMClass_args.DMClass;
    
    initArgs = obj$DMClass_args.args;
    init = DMClassObj[DMClass];
    
    init ? newInstance = new init(initArgs) : newInstance = new DMElementQuery(initArgs);
    
    return newInstance;
}
//OOP - queryClass
function queryClass(idString) {
    console.log("queryClass deprecated. Use DM(idString)")
    _element = document.getElementById(idString);
    _DMClass = _element.getAttribute("class") ? _element.getAttribute("class") : "DMElement";

    newDMElement = _new({
        DMClass: _DMClass,
        args: idString
    });
    
    return newDMElement;
}
//OOP - DM() function
function DM(idString) {
    _element = document.getElementById(idString);
    _DMClass = _element.getAttribute("class") ? _element.getAttribute("class") : "DMElement";

    newDMElement = _new({
        DMClass: _DMClass,
        args: idString
    });
    
    return newDMElement;
}


//DMRegistry
function DMRegistry() {
    //this will eventually be "SMART"-er
    //it should organize into classes
    
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
        //alert('finding id: '+_id);
        //console.log('DMRegistry.find(_id) has not yet been debugged. May not even work');
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
        //alert('replaceID is called');
        //console.log('DMRegistry.replace(obj$newID_oldID) has not yet been debugged. May not even work');
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
        //console.log('DMRegistry.set(obj$index_id_DMElement) has not yet been debugged. May not even work');
        //add bug catchers
        
        _index = obj$index_id_DMElement.index;
        _id = obj$index_id_DMElement.id;
        _DMElement = obj$index_id_DMElement.DMElement;
        
        this._arr[_index] = {id: _id, DMElement: _DMElement};
    }


//DMPush
function DMPush(_inserts,_toArr) {
    outputArr = new Array();
    outputArr = _toArr;
    
    for (h=0; h<_inserts.length; h++) {
       outputArr.push(_inserts[h]);
    }
    
    return outputArr;
}






//**********************************
//Notes, copy stuff, etc.
//**********************************

//alert('type: '+this._element.tagName+'\nidNum: '+this.getIDNum()+'\nDMClass: '+this._element.className+'\nSRC: '+this.SRC);

/*
DMImg.prototype.speak = function() {
    alert('type: '+this._element.tagName+'\nidNum: '+this.getIDNum()+'\nDMClass: '+this._element.className+'\nSRC: '+this.SRC);
}
*/

