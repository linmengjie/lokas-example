const ECS = require('ECS');
const PhysicWorld = require('PhysicWorld');


cc.Class({

    extends: cc.Component,

    _world: null,

    onLoad: function () {
        // 设置帧率
        cc.game.setFrameRate(30);
        // 创建ecs的世界world,所有的update都在world里执行
        _world = new ECS(1000 / cc.game.getFrameRate(), 1, {server: true});
        // _world = new ECS(1000 / 60, 1, {server: true});
        // 加载模块
        _world.loadModule(PhysicWorld);
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
            //_world.step();
        }
    }
});