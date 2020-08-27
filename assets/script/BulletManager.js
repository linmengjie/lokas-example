// const AccelerateComp = require('AccelerateComp');

// cc.Class({
//     extends: cc.Component,

//     properties: {
//         _bulletList: [],
//     },
//     editor: {
//         menu: "弹幕组件/BulletManager",
//     },

//     // use this for initialization
//     onLoad: function () {
//         // 
//         this._bulletList = [];
//         this.loadingAllRes();
//         // cc.log("啊啊");
//     },

//     // 加载子弹纹理
//     loadingAllRes: function() {
//         var self = this;
//         cc.loader.loadRes("bulletAltas", cc.SpriteFrame, function (err, assets) {
//             // cc.log(assets);
//             self._bulletList = assets;
//         });
//     },
  
    
//     // 创建子弹，为什么把创建放在这里，因为移除的时候，要放回池里
//     // 还有就是如果放在发射器里面，通过子弹对象去找发射器来掉用移除方法（放回池）很麻烦
//     // 因为子弹自己不知道它是由哪个发射器发射出来的
//     // index 就是子弹id或者说是类型, type是子弹所属阵营，默认0是玩家，1是敌人子弹
//     // createBullet: function(index) {
//     //     let bullet = null;
//     //     if(cc.pool.hasObject(AccelerateComp)) {
//     //         cc.log("子弹对象池");
//     //         bullet = cc.pool.getFromPool(AccelerateComp);
//     //         if(bullet.node.getParent()) {
//     //             cc.log("什么情况, 没有remove干净？");
//     //             bullet.node.removeFromParent();
//     //         }
//     //     }else {  
//     //         // cc.log(this.bulletList);
//     //         let bulletPrefabs = GlobalManager.getResList('bullets');
//     //         // if(bulletPrefabs==null || bulletPrefabs.length < index) {
//     //         //     // 资源还未加载,应该先保证资源已被加载，才会调用此方法。
//     //         //     return;
//     //         // }
//     //         let bulletNode = cc.instantiate(bulletPrefabs[index]);
//     //         bullet = bulletNode.getComponent(AccelerateComp);  
//     //     }
//     //     // 所有的子弹应该共用一个对象池，一个纹理集合
//     //     return bullet;
//     // },
//     createBullet: function(bulletType, bulletTeam) {
//         // 根据纹理来创建子弹
//         let sp = this._bulletList[bulletType];
//         let node = new cc.Node('bullet');
//         let bulletSprite = node.addComponent(cc.Sprite);
//         bulletSprite.spriteFrame = sp;
//         //
//         let bullet = node.addComponent(AccelerateComp);
//         let box = node.addComponent(cc.BoxCollider);
//         box.size = node._contentSize;
//         box.tag = this.shootId;
//         bullet.bulletTeam = bulletTeam; // 保存子弹的发射者，现在逻辑是通过子弹类型检测，保留发射者以后有用
//         //FIXME 有个碰撞类型的 tag需要处理，尽量与ID绑定
//         return bullet;
        
//     },
//     // 移除子弹
//     removeBullet: function(bullet) {
//         bullet.node.removeFromParent();
//         bullet.node.active = false;
//         //cc.pool.putInPool(bullet); //放回对象池暂时有Bug
//     },  

//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {

//     // },
// });
