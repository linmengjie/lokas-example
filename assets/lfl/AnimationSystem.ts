// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CanvasComp from "./CanvasComp";


const ECS = require('ECS');
const System = require('System');



const {ccclass, property} = cc._decorator;

export default class AnimationSystem extends System {

    public name:string = 'Animation';
    public components:string[][] = [];

    beforeUpdate (dt,now,ecs) {
        console.log(dt);
        cc.director.getAnimationManager().update(dt);
    }
    // updateEntity(ent, dt,now,ecs) {
    // }

    // afterUpdate (dt,now,ecs) {
    //     let cCanvas = ecs.getSingleton(CanvasComp);
    //     for (let i=0;i<7;i++) {
    //         cCanvas.getContext(i).strokeColor = cc.Color.BLUE;
    //         cCanvas.getContext(i).stroke();
    //     }
    // }

}
