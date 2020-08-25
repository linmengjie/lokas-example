const ECS = require('ECS');
const PhysicTest = require('PhysicTest');
const Component = require('Component');
const ModuleTest = require('ModuleTest');
const Circle = require('Circle');


cc.macro.BATCH_VERTEX_COUNT = 400000;


class Position extends Component {
    static get defineName() {
        return 'Position';
    }
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}

cc.Class({

    extends: cc.Component,

    properties: {},

    onLoad: function () {
        let ecs = new ECS(1000 / 30, 1, {server: true});
        ecs.registerComponent(Position);
        //ecs.registerComponent(Circle);
        //ecs.loadModule(PhysicTest);
        // console.log(Circle);
        // console.log(Position);
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