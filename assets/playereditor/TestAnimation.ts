// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 取消show
        cc.game.off(cc.game.EVENT_HIDE);
        cc.game.off(cc.game.EVENT_SHOW);
    }

    start () {
        console.log("场景开始");
        cc.game.setFrameRate(30);
        let node = this.node.getChildByName('node');
        let animation = node.getComponent(cc.Animation);
        animation.play();
    }

    lateUpdate (dt) {
        let node = this.node.getChildByName('node');
        let animation = node.getComponent(cc.Animation);
        if (!animation.currentClip) {
            return;
        }
        let state = animation.getAnimationState(animation.currentClip.name);
        if (state.isPlaying) {
            console.log(cc.director.getTotalFrames(), cc.director.getDeltaTime(), node.color.r);
        }

    }
}
