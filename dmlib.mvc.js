//Made by Doug Mead

//App Delegate
dm.createClass("DMApp")
DMApp = dm.extend("DMApp","DMElement")
DMApp.prototype.main = function() {
    //do something
}
//switchSceneControllers - hides one and displays another
//setSceneControllers
//setInitialSceneController

//MVC
dm.createClass("DMSceneController")
DMScene = dm.extend("DMSceneController","DMElement")

DMScene.prototype.main = function() {
    //do something
}
//prepareScene
//sceneDidPrepare

//sceneWillAppear
//sceneDidAppear

//sceneWillHide
//sceneDidHide

//sceneWillSegue(inOrOut)
//sceneDidSegue(inOrOut)