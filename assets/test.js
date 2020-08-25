const ECS = require('ECS');
const PhysicTest = require('PhysicTest');
const Component = require('Component');


cc.macro.BATCH_VERTEX_COUNT = 400000;

cc.Class({

    extends: cc.Component,

    properties: {},

    onLoad: function () {
        let ecs = new ECS(1000 / 30, 1, {server: true});
        ecs.loadModule(PhysicTest);
        // console.log(ModuleTest);
        // ecs.loadModule(ModuleTest);
        
        
        ecs.start();
    },

    start: function () {

    },

    onEnable: function () {

    },

    onDisable: function () {

    }
});