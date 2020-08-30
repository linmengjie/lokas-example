// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CCNodeComp from "./CCNodeComp";

const {ccclass, property} = cc._decorator;
const Component = require('Component');

export default class SpriteComp extends Component {

    spriteFrame:cc.SpriteFrame;

    public constructor(sprite:cc.SpriteFrame) {
        super();
        this.spriteFrame = sprite;
    }

    static get defineName(){
        return 'SpriteComp'
    }

    onAdd(){
        let node = this.getSibling(CCNodeComp).node;
        let context:cc.Sprite = node.addComponent(cc.Sprite);
        context.spriteFrame = this.spriteFrame;
    }
}
