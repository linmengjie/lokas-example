console.log("加载CCECS");

// 重载 sharedInit(), 自定义
let sharedInitFunc = cc.director.sharedInit.bind(cc.director);
        cc.director.sharedInit=()=>{
            console.log("开始初始化cc.director.sharedInit()");
            sharedInitFunc();
        }

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
