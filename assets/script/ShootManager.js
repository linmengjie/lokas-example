// const ConfigManager = require('ConfigManager'); // 配置对象
// const GlobalManager = require('GlobalManager'); // 全局对象
// const BulletManager = require('BulletManager');
// const AccelerateComp = require('AccelerateComp');

// var ShootStatus = cc.Enum({
//     READY: 0,
//     FIREING: 1,
//     END: 2
// });

// cc.Class({
//     extends: cc.Component,

//     properties: {
//         // shootid: {
//         //     default: 0, //发射器ID
//         // },
//         bulletType: { //子弹纹理名称
//             default: "0",
//             tooltip: "纹理图片类型"
//         },
//         //-------------基本-----------
//         startFrame: {
//             default: 0,
//             tooltip: "发射器生命周期，开始帧"
//         },
//         endFrame: {
//             default: 200,    
//             tooltip: "发射器生命周期，结束帧"
//         },
//         //-------------发射器-----------
//         radius: {   //半径，计算发射位置
//             default: 0,
//             tooltip: "半径，计算发射位置"
//         },
//         orientation: {  //发射方向,计算半径,圆上的点作为发射点
//             default: 0, 
//             tooltip: "发射方向,计算半径,圆上的点作为发射点"
//         },
//         angle: {  //发射器的角度，也是子弹初始角度
//             default: 0,  
//             tooltip: "发射器的角度，也是子弹初始角度"
//         },
//         period: {
//             default: 5, //发射周期，频率
//             tooltip: "发射周期，频率"
//         },
//         concurrent: {  //并发子弹数，条数
//             default: 1,
//             tooltip: "并发子弹数，条数"
//         },
//         scope: {    //并发范围
//             default: 360, 
//             tooltip: "并发范围"
//         },
//         distance: { //多个并排子弹距离，和并发范围互斥
//             default: 0,
//             tooltip: "多个并排子弹距离，和并发范围互斥"
//         },
//         //---------子弹属性配置--------
//         bullet_speed: {
//             default: 10,
//         },
//         bullet_accelerate: {
//             default: 0,
//         },
//         bullet_direction: {
//             default: 0,
//         },
//         bullet_frame: { //子弹持续帧，计算子弹的射程
//             default: 200,  
//         },
//         //-------------其他-----------
//         isTrace: {  //是否是跟踪弹
//             default: false
//         },
//         autoFire: {
//             default: true
//         },
//         _bulletManager: null, // 子弹工厂组件
//         _status: ShootStatus.READY, // 发射器状态
//     },
//     editor: {
//         menu: "弹幕组件/ShootManager",
//         // 允许当前组件在编辑器模式下运行。
//         // 
//         // 
//         // 值类型：Boolean
//         // 默认值：false
//         // executeInEditMode: true,
//         // 当设置了 "executeInEditMode" 以后，playOnFocus 可以用来设定选中当前组件所在的节点时，
//         // 编辑器的场景刷新频率。
//         // playOnFocus 如果设置为 true，场景渲染将保持 60 FPS，如果为 false，场景就只会在必要的时候进行重绘。
//         // 
//         // 值类型：Boolean
//         // 默认值：false
//         // playOnFocus: false,

//     },

//     // use this for initialization
//     onLoad: function () {
//         let self = this;
//         // 全局子弹工厂
//         // this.bulletManager = cc.find('bulletManager').getComponent(BulletManager);
//         this.bulletLayer = cc.find('Canvas/bulletLayer');
//         this._bulletManager = this.bulletLayer.getComponent(BulletManager);
//         // 
//         this.bulletCount = 0; // 发射最大子弹数
//         this.initRotation = 0; //发射器初始角度
//         this.firePeriod = this.period; //计算发射周期的变量
//         this.runFrame = 0;
        
//         this.shooter = 0; // 标识发射者， 0是默认中立， 1是玩家， 2是敌人； 也是fire的参数

//         // 子弹道具的时间效果
//         this.propsTime = 0;
//         // 老的子弹配置
//         // this.oldShootId = this.shootId; 

//         // 绘图初始化
//         this.initDraw();
//         // 初始化发射器状态，为什么在上面初始化失败？？？
//         this._status = ShootStatus.READY;
//         // cc.log(this._status, ShootStatus.READY);

//     },
//     initDraw: function() {
//         // 初始化绘图组件
//         // 绘图组件
//         this.draw = this.node.addComponent(cc.Graphics);
//         this.draw.circle(0, 0, 1);//发射器中心位置
//         this.draw.stroke();
//         // 画出半径上的圆形，红绿色
//         this.draw.circle(0, 0, this.radius);
//         this.draw.stroke();
//         //开始线
//         let start = new cc.Vec2(this.node.position.x + this.radius, this.node.position.y);
//         this.draw.close();
//         //this.draw.moveTo(this.node.x, this.node.y);
//         this.draw.lineTo(start);
//         this.draw.stroke();
        
//         let shootPoint = this.getShootPoiont();
//         this.draw.close();
//         //this.draw.moveTo(this.node.x, this.node.y);
//         this.draw.lineTo(shootPoint);
//         this.draw.strokeColor = cc.color(0, 0, 255, 255);
//         this.draw.stroke();
//     },
//     // 设置子弹配置，改变发射器类型，升级弹幕
//     // 为了控制同样的ID产生替换老道具失败，所以用ID来设置配置
//     setConfig: function(cfgId) {
//         // 时效性的弹幕
//         let config = ConfigManager.getConfigTypeId("ShootConfig", parseInt(cfgId));
//         if(config === null) {
//             cc.log("不存在该弹幕配置，请修正", cfgId);
//             return;
//         }
//         if(config.time > 0) {
//             this.propsTime = config.time;
//         }
//         if(config.id === this.shootId) {
//             // 只叠加时间
//             return;   
//         }
//         // 设置弹幕ID,对多次不同类型的时效弹幕做处理
//         if(config.time > 0 && this.shootId === 1001) { //先写死只有1中初始弹幕
//             this.oldShootId = this.shootId;
//         }
//         this.shootId = config.id;
//         cc.log("初始化发射器完成setConfig:", cfgId);
        
//         // 类似attr, 保存老的配置，赋值新的配置
//         for(let key in config) {
//             this[key] = config[key];
//         }
//     },
    
//     // 暂时无用，考虑发射器事件组再说
//     reFire: function() {
//         // 重新发射，为了让发射器生命周期复活（开始帧，结束帧重置）
//         this.runFrame = 0;
//         this.fire();
//     },
//     // 返回本地坐标的发射位置
//     getShootPoiont: function() {
//         //半径为0时，发射器中心为发射点
//         let selfPos = this.node.position;
//         let orientation = (0-this.orientation) * Math.PI/180;
//         let x1 = selfPos.x + this.radius * Math.cos(orientation).toFixed(10);
//         let y1 = selfPos.y + this.radius * Math.sin(orientation).toFixed(10);
//         let shootPoint = new cc.Vec2(x1, y1);     
//         return shootPoint;
//     },
//     initFire: function() {
//         // 发射周期结束后，重置初始状态；
//         // 重置状态，开始帧，初始位置
//         //cc.log("重置发射");
//         this.runFrame = 0;
//         this._status = ShootStatus.READY;
        
//     },
//     // 这个开火是发射器发射一串子弹（可能多个子弹，也可能一个，就是一次发射）
//     fireOnce: function(bulletTeam) { //参数，子弹阵营，指定是谁发射的
//         bulletTeam = bulletTeam || 1;
//         cc.log("发射？");
//         // if(!this.checkFire()) {
//         //     return;
//         // }
//         // 初始化发射`
//         // this.initFire();
        
//         if(this._status !== ShootStatus.FIREING) {
//             cc.log("上一轮发射进行中...222")
//             return;
//         }
//         // 开火频率控制
//         if(this.firePeriod < this.period) {
//             this.firePeriod++;
//             return;
//         }
//         // 重置开火间隔
//         this.firePeriod = 0;
//         // cc.log("???");
//         // 发射该颗子弹时的角度，可以理解为发射器的角度,但是，请先理解成子弹的角度
//         let rotation = (this.scope===0?360:this.scope) / this.concurrent;
//         // 计算奇数弹，还是偶数弹，第一弹的发射角度
//         let initRotation = this.concurrent%2===0 ? 
//                             rotation/2 * (this.concurrent-1) : 
//                             rotation * (Math.floor(this.concurrent/2)); 
//         for(let i = 0; i < this.concurrent; i++) {
//             // 克隆子弹
//             let bullet = this._bulletManager.createBullet(this.bulletType, bulletTeam);
//             // 添加到父节点,后面添加会影响角度，why?
//             this.bulletLayer.addChild(bullet.node);
            
//             // 发射角度，子弹发射角度默认向右为0，计算敌我阵营转换进行旋转
//             let shootAngle = this.angle;
            
//             // FIXME 先转换成相对于世界坐标，再转相对于bulletLayer本地坐标
//             let shootPoint = this.getShootPoiont();
//             let worldPoint = shootPoint.add(this.node.convertToWorldSpaceAR(cc.v2(0,0)) );
//             let layerPoint = this._bulletManager.node.convertToNodeSpaceAR(worldPoint);
            
//             cc.log("shootPoint", shootPoint, "worldPoint", worldPoint, "layerPoint", layerPoint);
//             // 子弹的发射点,如果考虑子弹的缩放，还需要做处理。
//             bullet.node.setPosition(layerPoint); 
            
//             //有距离的就不按范围计算
//             if(this.distance>0) {
//             // 计算奇数弹，还是偶数弹
//                 bullet.node.x += this.concurrent%2===0 ?
//                      -this.distance/2 - (this.concurrent/2-1) * 
//                      this.distance + this.distance * i :
//                      - (Math.floor(this.concurrent/2)) * this.distance 
//                      + this.distance * i;
//             }else if(this.concurrent>1){
//                 // 改变发射器的方向，也就是子弹的发射角度
//                 // rotation是总发射角度，initRotation是条数之间的夹角
//                 shootAngle = this.angle + rotation * (i) - initRotation + bullet.node.angle;
//             }
//             // cc.log("发射子弹角度", angle); 
//             // 初始化子弹
//             bullet.init(shootAngle, this.bullet_speed, 
//                 this.bullet_accelerate, this.bullet_direction);
//             //设置子弹活动
//             bullet.node.active = true;
//             // 是否追踪子弹，临时处理FIXME
//             bullet.isTrace = this.isTrace;
//         } 
//     },
//     // 控制开发频率 
//     checkFire: function (dt) {
//         this.runFrame++;
//         // cc.log("是是是", this._status, ShootStatus.READY, this.runFrame, this.startFrame);
//         if(this._status === ShootStatus.READY && this.runFrame > this.startFrame) {
//             this._status = ShootStatus.FIREING;
//             cc.log("开始发射");
//             return;
//         }
//         if(this._status === ShootStatus.FIREING && this.runFrame >= this.endFrame) {
//             // endFrame不应该是0或者无限，默认200
//             this._status = ShootStatus.END;
//             cc.log("开始结束");
//             return;
//         }
//         if(this._status === ShootStatus.END) {
//             this.initFire();
//             return;
//         }
 
//     },
//     // called every frame, uncomment this function to activate update callback
//     update: function(dt) {
//         // if(!GlobalManager.isLoad) {
//         //     return;
//         // }
//         if(this.autoFire) {
//             this.checkFire(dt);
//             // 可以手动调用，如敌机AI就是应该手动调用了。。。
//             this.fireOnce();
//         }
//         // 道具的时间效果 
//         // this.checkConfigTime();
//     },
//     // checkConfigTime: function() {
//     //     if(this.propsTime > 0) {
//     //         // cc.log("发生什么情况", this.propsTime);
//     //         this.propsTime--;
//     //         if(this.propsTime < 1) {
//     //             this.setConfig(this.oldShootId);
//     //             this.propsTime = 0;
//     //         }
//     //     }
//     // }
    
// });
