const ECS = require('ECS');
const PhysicTest = require('PhysicTest');

cc.macro.BATCH_VERTEX_COUNT = 400000;

cc.Class({

    extends: cc.Component,

    _world: null,

    onLoad: function () {
        // 创建ecs的世界world,所有的update都在world里执行
        _world = new ECS(1000 / 30, 1, {server: true});
        // 加载模块
        _world.loadModule(PhysicTest);
        // 开始
        _world.start();
        //pause
        let pauseFunc = cc.game.pause.bind(cc.game);
        cc.game.pause=()=>{
            pauseFunc();
            _world.pause();
        }
        //resume
        let resumeFunc = cc.game.resume.bind(cc.game);
        cc.game.resume=()=>{
            resumeFunc();
            _world.resume();
        }
        //step
        let stepFunc = cc.game.step.bind(cc.game);
        cc.game.step=()=>{
            stepFunc();
            _world.step();
        }

        // 测试用例
        // console.log("测试用例------");
        // console.log(_world.hashGroups('Polygon'));
        // console.log(_world.hashGroups(['Polygon', 'Circle']));
        // console.log(_world.hashGroups([['Circle','Polygon']]));
        // console.log(_world.hashGroups(['Position', ['Polygon', 'Circle']]));
        // console.log(_world.hashGroups(['Position', 'Angle', ['Polygon', 'Circle']]));
        // console.log(_world.hashGroups(['Collider',['Circle','Polygon'],'Velocity']));
        // console.log("测试用例------");
    }
});