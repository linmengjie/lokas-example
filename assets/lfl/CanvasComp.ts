// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
const Component = require('Component');

/**
 * 画布组件
 */
export default class CanvasComp extends Component {

    public size:number;
    public contexts:cc.Graphics[];
    public nodes:cc.Node[];
    public colliderContext:cc.Graphics;

    public constructor(){
        super();
        this.size = 7;
        this.contexts = [];
        this.nodes = [];
        this.colliderContext;
    }

    static get defineName(){
        return 'CanvasComp';
    }

    onAdd(){
        for (let i=0; i<this.size; i++) {
            let node = new cc.Node();
            let context = node.addComponent(cc.Graphics);
            cc.find('Canvas').addChild(node);
            this.nodes.push(node);
            this.contexts.push(context);
        }
        // 碰撞框节点
        let node = new cc.Node();
        this.colliderContext = node.addComponent(cc.Graphics);
        cc.find('Canvas').addChild(node);
    }

    onRemove(ent,ecs) {
        for (let i=0;i<this.nodes.length;i++) {
            this.nodes[i].removeFromParent(true);
        }
        this.nodes = [];
        this.contexts = [];
    }
    
    getContext(index){
        return this.contexts[index];
    }
    clear(){
        for (let i=0;i<this.contexts.length;i++) {
            this.contexts[i].clear();
        }
    }
    getColliderContext() {
        return this.colliderContext;
    }
    clearCollider() {
        this.colliderContext.clear();
    }

}
