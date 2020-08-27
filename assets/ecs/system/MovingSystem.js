const {Position,Velocity,Acceleration} = require("../physic/BaseComponents");
const Circle = require('../physic/Circle');
const Polygon = require('../physic/Polygon');

let MovingSystem = [
    /**
     * 通过加速度计算速度值
     */
    function AccelSubSystem() {
        this.name = 'AccelSubSystem';
        this.components = [Velocity,Acceleration];
        this.updateEntity = function (ent, dt, now, ecs) {
            let vel = ent.get(Velocity);
            let acc = ent.get(Acceleration);
            vel.x+=acc.x*dt/1000;
            vel.y+=acc.y*dt/1000;
        };
    },
    /**
     * 通过速度实现位移
     */
    function MoveSubSystem() {
        this.name = 'MoveSubSystem';
        this.components = [[Circle,Polygon,Position],Velocity];
        this.updateEntity = function (ent, dt, now, ecs) {
            let cVelocity = ent.get('Velocity');
            let pos = ent.get(['Polygon','Circle','Position']);
            pos.x+=cVelocity.x*dt/1000;
            pos.y+=cVelocity.y*dt/1000;
        }
    },
];

module.exports = MovingSystem;
