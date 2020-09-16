// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResLoader from "../script/ResLoader";



//import Logger from "./logger/Logger";

const {ccclass, property} = cc._decorator;
const bandit = require('bandit');
const Logger = require('Logger');


@ccclass
export default class playerTest extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    spriteFrameList:cc.SpriteFrame[] = [];

    onLoad () {
        // 停掉系统的动画播放
        // cc.director.getScheduler().unscheduleAllForTarget(cc.director.getAnimationManager());
        // TODO 使用ecs的动画播放
        
        // 加载图集
        let self = this;
        //
        cc.assetManager.loadBundle('resources', async function (err, bundle) {
            if (err) {
                return console.error(err);
            }
            console.log('load bundle successfully.');
            // 创建node
            let node = new cc.Node();
            node.name = bandit.bmp.name;
            self.node.addChild(node);
            //
            let animation = node.addComponent(cc.Animation);
            let sprite = node.addComponent(cc.Sprite);
            // 加载图集
            for (let image of bandit.bmp.files) {
                // 加载 Texture
                let path = image.file.substring(0, image.file.lastIndexOf('.'));
                let width = image.w + 1;
                let height = image.h + 1;
                //
                let texture = await ResLoader.LoadRes(bundle, path, cc.Texture2D);

                for (let i=0; i<image.row; i++) {
                    for (let j = 0; j < image.col; j++) {
                        let x = j * 80;
                        let y = i * 80;
                        let rect = new cc.Rect(x, y, width, height);
                        let spriteFrame = new cc.SpriteFrame(texture, rect, false , cc.v2(0,0), cc.size(width,height));
                        // console.log(spriteFrame);
                        spriteFrame.name = bandit.bmp.name+"_"+(i*image.col + j);
                        self.spriteFrameList.push(spriteFrame);
                    }
                }
            }
            // 加载动画
            // map
            let animationMap = new Map();
            for(const key of Object.keys(bandit.frame)) {
                if(bandit.frame.hasOwnProperty(key)) {

                    let obj = bandit.frame[key];
                    // console.log(obj.name, obj.pic);
                    // 分组保存
                    if (!animationMap.has(obj.name)) {
                        animationMap.set(obj.name, []);
                    }
                    animationMap.get(obj.name).push(obj.pic);
                }
            }
            // console.log(animationMap);
            // 遍历map
            //对map键进行迭代
            animationMap.forEach((value, key) => {
                // console.log("Map Keys= ", key, value);
                let spriteFrames = self.getSpriteFramesByIndexs(value);
                let clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 3);
                clip.name = key;
                clip.wrapMode = cc.WrapMode.Loop;
                animation.addClip(clip);
            });

            // 播放默认动画
            // sprite.spriteFrame = self.spriteFrameList[0];
            // console.log(self.spriteFrameList);
            let state = animation.play('standing');
            console.log(state);


            // 画出碰撞区域，这应该在场景里显示才对了。



        });
        
    }

    getSpriteFramesByIndexs(array:number[]):cc.SpriteFrame[] {
        let frames = new Array();
        for (let index = 0; index < array.length; index++) {
            frames.push(this.spriteFrameList[index]);
        }
        return frames;
    }

    /**
     * 删除后缀
     * @param image 图片路径
     */
    delImgLast(image:string) {
        let path = image.substring(0, image.lastIndexOf('.'));
        console.log(path);
        return path;
    }

    start () {

    }

    // update (dt) {}
}
