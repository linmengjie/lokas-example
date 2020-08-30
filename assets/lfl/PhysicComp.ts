// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
const Component = require('Component');
const BVTree = require('BVTree');
const QuadTree = require('QuadTree');

export default class PhysicComp extends Component {

    public constructor(){
        super();
        this.bvTree = new BVTree();
    }

    static get defineName(){
        return 'PhysicComp'
    }

    remove(collider,updating=false){
        this.bvTree.remove(collider,updating);
    }
    insert(collider,updating=false){
        this.bvTree.insert(collider,updating);
    }
    potentials(collider){
        return this.bvTree.potentials(collider);
    }
    draw(context){
        console.log("=====1");
        this.bvTree.draw(context);
        console.log("=====2");
    }
}
