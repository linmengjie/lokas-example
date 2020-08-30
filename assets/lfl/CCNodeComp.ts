// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
const Component = require('Component');

export default class CCNodeComp extends Component {


    public x:number;
    public y:number;
    public node:cc.Node;

    public constructor(x:number=0, y:number=0) {
        super();
        this.x = x;
        this.y = y;
    }

    static get defineName(){
        return 'CCNodeComp'
    }

    onAdd(){
        this.node = new cc.Node();
        this.node.x = this.x;
        this.node.y = this.y;
        cc.find('Canvas').addChild(this.node);
    }
}
