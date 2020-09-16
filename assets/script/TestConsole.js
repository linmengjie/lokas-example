// cc.log("load TestConsole.");

window.Test = {};
Test.$ = function(name) {
    let scene = cc.director.getScene();
    if(!name) {
        return scene;
    }
    return scene.getChildByName(name);
}

Test.$2 = function(compName) {
    let canvas = Test.$('Canvas');
    if(!compName) {
        return canvas;
    }
    return Test.$('Canvas').getComponent(compName);   
}

//这些变量其实都可以在切换场景后回调。

//逻辑主对象
Test.logicCompName = 'GameLogicComp';
Test.$$ = function() {
    return Test.$2(Test.logicCompName);
}




