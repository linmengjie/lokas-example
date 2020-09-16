// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerEditor extends cc.Component {

    @property(cc.ScrollView)
    cilpsView: cc.ScrollView = null;

    @property
    text: string = 'hello';

    animation: cc.Animation;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    /**
     * 加载动画
     * @param animation 
     */
    loadAnimation(animation:cc.Animation) {
        if (!this.cilpsView) {
            return;
        }
        // 解析动画，显示在列表里
        cc.log("解析动画");
        let self = this;
        this.animation = animation;
        this.cilpsView.content.height = animation.getClips().length * (20 + 3) + 10;
        animation.getClips().forEach((clip, index) => {
            //cc.log(clip.name, index);
            let item = new cc.Node();
            item.name = clip.name;
            item.width = 100;
            item.height = 20;
            item.setPosition(0, -item.height * (0.5 + index) - 3 * (index + 1) - 15);
            // 点击事件
            item.on('touchend', function () {
                //console.log("Item " + this.name + ' clicked');
                self.loadClip(clip);
            }, this);
            //
            let label = item.addComponent(cc.Label);
            label.string = clip.name;
            label.fontSize = 16;
            this.cilpsView.content.addChild(item);
        });
    }

    /**
     * 加载剪辑
     * @param clip 
     */
    loadClip(clip:cc.AnimationClip) {
        cc.log('loadClip', clip);
    }

    // update (dt) {}
}
