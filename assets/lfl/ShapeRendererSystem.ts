// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CanvasComp from "./CanvasComp";


const ECS = require('ECS');
const System = require('System');
const {Position,Velocity,Acceleration,Angle} = require("BaseComponents");
const Circle = require('Circle');
const Polygon = require('Polygon');
const Collider = require('Collider');
const Dice = require('Dice');


const {ccclass, property} = cc._decorator;

export default class ShapeRendererSystem extends System {


    public name:string = 'shapeRenderer';
    public components:string[][] = [[Circle,Polygon]];

    beforeUpdate (dt,now,ecs) {
        let cCanvas = ecs.getSingleton(CanvasComp);
        cCanvas.clear();
    }
    updateEntity(ent, dt,now,ecs) {
        let cPolygon = ent.get('Polygon');
        let cCircle = ent.get('Circle');
        let cCanvas = ecs.getSingleton(CanvasComp);
        let context = cCanvas.getContext(Dice.rngInt(0,6));
        //
        cPolygon && cPolygon.draw(context);
        cCircle && cCircle.draw(context);
    }

    afterUpdate (dt,now,ecs) {
        let cCanvas = ecs.getSingleton(CanvasComp);
        for (let i=0;i<7;i++) {
            cCanvas.getContext(i).strokeColor = cc.Color.BLUE;
            cCanvas.getContext(i).stroke();
        }
    }

}
