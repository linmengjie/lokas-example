import PhysicComp from "./PhysicComp";
import CanvasComp from "./CanvasComp";
import ShapeRendererSystem from "./ShapeRendererSystem";
import Entity from "../ecs/Entity";
import CCNodeComp from "./CCNodeComp";
import SpriteComp from "./SpriteComp";
import AnimationSystem from "./AnimationSystem";

const {ccclass, property} = cc._decorator;
//
const {Position,Velocity,Acceleration,Angle} = require("BaseComponents");
const Circle = require('Circle');
const Polygon = require('Polygon');
const Collider = require('Collider');
const MovingSystem = require('MovingSystem');
const Dice = require('Dice');
const ECS = require('ECS');

let width = 960;
let height = 640;

module.exports = {
    name:'PhysicWorld',
    /**
     * 初始化组件和系统
     */
    onLoad(ecs) {
        // FIXME 组件的初始化怎么搞？？？
        ecs.registerComponent(Circle);
        ecs.registerComponent(Polygon);
        ecs.registerComponent(Collider);
        ecs.registerSingleton(CanvasComp);
        ecs.registerSingleton(PhysicComp);
        ecs.registerComponent(Position);
        ecs.registerComponent(Angle);
        ecs.registerComponent(Velocity);
        ecs.registerComponent(Acceleration);
        //
        ecs.registerComponent(CCNodeComp);
        ecs.registerComponent(SpriteComp);
        //ecs.registerSystem(MovingSystem);
        
        // ecs.registerSystem(AnimationSystem);
        ecs.registerSystem(ShapeRendererSystem);


        //
        ecs.setSpawner('Polygon',function (ecs, x, y, points) {
            let ent = ecs.createEntity();
            // polygon依赖于'Position','Angle'
            ent.add(Position, x, y);
            ent.add(Angle);
            //
            ent.add(Polygon, points);
            ent.add(Collider);
            ecs.getSingleton(PhysicComp).insert(ent);
            return ent;
        });

        ecs.setSpawner('Circle',function (ecs, x, y, radius, scale) {
            let ent = ecs.createEntity();
            ent.add(Position, x, y);
            ent.add(Circle,radius,scale);
            ent.add(Collider);
            // 添加速度组件，让其移动
            let speed = ent.add(Velocity,1,1);
            speed.angle = Dice.rng(0,360);
            speed.speed = Dice.rng(34,60);
            // 加入物理碰撞计算
            ecs.getSingleton(PhysicComp).insert(ent);
            return ent;
        });

        //
        // 创建世界边框
        ecs.spawnEntity('Polygon',-width/2, -height/2, [[0, 0], [width, 0]]);
        ecs.spawnEntity('Polygon',-width/2, -height/2, [[width, 0], [width, height]]);
        ecs.spawnEntity('Polygon',-width/2, -height/2, [[width, height], [0, height]]);
        ecs.spawnEntity('Polygon',-width/2, -height/2, [[0, height], [0, 0]]);


        // 角色
        ecs.setSpawner('player',function (ecs, x, y, spriteFrame) {
            let ent:Entity = ecs.createEntity();
            ent.add(CCNodeComp, x, y);
            ent.add(SpriteComp, spriteFrame);
            return ent;
        });

        // 创建角色，创建动画，控制角色移动，控制动画播放
        ecs.spawnEntity('player', 400, 400, null);

        // 绘制碰撞框，观察碰撞框变化。

        // 创建角色2，观察受击框框，操作角色1殴打角色2

        // 绘制角色状态栏，动画状态机完善，AI集成

        // 优化物理接近原游戏的样子。




    }

}

