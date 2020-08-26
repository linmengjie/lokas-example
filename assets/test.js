const ECS = require('ECS');
const PhysicTest = require('PhysicTest');

cc.macro.BATCH_VERTEX_COUNT = 400000;

cc.Class({

    extends: cc.Component,

    properties: {},

    _world: null,

    onLoad: function () {
        // 创建ecs的世界world,所有的update都在world里执行
        // _world = new ECS(1000 / 30, 1, {server: true});
        // // 加载模块
        // _world.loadModule(PhysicTest);
        // // 开始
        // _world.start();

        let g = this.node.addComponent(cc.Graphics);
        g.lineWidth = 10;
        g.lineTo(100, 200);
        //g.close();
        g.fill();
        g.stroke();
        //
        console.log(g);


        //
        // let cCanvas = _world.getSingleton('Canvas');
        // let context = cCanvas.getContext(0);
        // context.moveTo(100,100);
        // context.lineTo(100, 200);
        // context.close();
        // context.stroke();
        // context.fill();


        
        //pause
        //resume
        // cc.game.on(cc.game.EVENT_SHOW, function () {
        //     _world.resume();
        // });

        // cc.game.on(cc.game.EVENT_HIDE, function () {
        //     _world.pause();
        // });
    },

    start: function () {

    },

    onEnable: function () {

    },

    onDisable: function () {

    }
});