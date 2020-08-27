// cc.Class({
//     extends: cc.Component,

//     properties: {
//        speed: {    // 初速度
//             default: 10,  
//         },
//         angle: {    //初速度角度
//             default: 0,  
//         },
//         accelerate: { // 加速度
//             default: 0,  
//         },
//         direction: {  // 加速度方向
//             default: 0,
//         },
//         isRotation: {   //节点朝向是否跟随速度
//             default: true
//         }
//     },
    
//     editor: {
//         menu: "弹幕组件/AccelerateComp",
//         // 允许当前组件在编辑器模式下运行。
//         // 默认情况下，所有组件都只会在运行时执行，也就是说它们的生命周期回调在编辑器模式下并不会触发。
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
//         // playOnFocus: true,

//     },
    
//     // use this for initialization
//     onLoad: function () {
//         this.runFrame = 0;
//         // 备份初始角度，以便加速度为0时，角度依然有意义
//         // 初始子弹朝右就是0度?让初始角度是可变角度，可设定
//         this.initRotation = - this.node.angle; 
//         // 初始化组件
//         this.init(this.angle, this.speed, this.accelerate, this.direction);
//     },
    
//     // FIXME 这里的所有角度都是以向右为0度, angle是发射器的角度，不代表子弹本身的旋转
//     // 这个方法只能初始化调用，中途要改变，不能调用它
//     init: function(angle, speed, accelerate, direction) {
//         // 初始化子弹配置属性
//         this.angle = angle;
//         this.speed = speed;
//         this.accelerate = accelerate;
//         this.direction = direction;
//         // cc.log(this.angle, this.speed, this.accelerate, this.direction);
//         //
//         if(this.isRotation) {
//             // 角度发生变化，子弹朝向也应该发生变化。
//             this.node.angle = this.initRotation + angle;
//         }
//         // 初速度默认方向
//         this.initSpeed(angle, speed);
//         // 加速度的方向, 根据初速度来计算所以加angle
//         this.initAcclerate(accelerate, angle + direction);
//     },
//     initSpeed: function(angle, speed) {
//         // (0-angle) 角度取反，因为数学里的正方向是逆时针，和cocos相反
//         // cc.log("initSpeed angle=" ,angle);
//         // 转换成弧度
//         let radian = (0-angle) / 180 * Math.PI;
//         let y = Math.sin(radian).toFixed(10) * speed;
//         let x = Math.cos(radian).toFixed(10) * speed;
//         // 不占用变量初始值，因为已经不是同一个概念
//         this._speed = new cc.Vec2(x, y); 
//         // cc.log("初速度,", x, y);
        
//     },
//     initAcclerate: function(accelerate, direction) {
//         // 转换成弧度
//         let radian = (0-direction) / 180 * Math.PI;
//         let ay = accelerate * Math.sin(radian).toFixed(10);
//         let ax = accelerate * Math.cos(radian).toFixed(10);
//         // 不占用变量初始值，因为已经不是同一个概念
//         this._accelerate = new cc.Vec2(ax, ay);
//         // cc.log("加速度，", ax, ay);
//     },

//     // 追踪弹计算，给追踪弹组件调用的接口
//     traceAngle: function(angle, target) {
//         // 也就是要重新初始化速度，不影响加速度
//         cc.log("trace:", angle, this.angle + angle);
//         // 以右边为0度，所以-90度计算
//         let result = (this.angle + angle)%360;
//         this.init(result, this.speed, this.accelerate, this.direction);
//     },

//     // called every frame, uncomment this function to activate update callback
//     update: function (dt) {
//         //计算合力
//         this._speed = this._speed.add(this._accelerate);
//         // cc.log("速度变化，", this._speed.x, this._speed.y);
//         //合力位移
//         this.node.x += this._speed.x;
//         this.node.y += this._speed.y;
//         if(this.isRotation) {
//             // atan范围是-90~90度 atan2是-180~180，返回的是弧度。
//             let rotate = Math.atan2(this._speed.y, this._speed.x).toFixed(10) * (180 / Math.PI);
//             // 取反是因为cocos里面顺时针是正角度往右旋转，和数学相反，所以结果取反
//             this.node.angle =  0 -rotate + this.initRotation;
//             // cc.log("加速度角度", this._speed.y, this._speed.x, 0 - rotate.toFixed(0));
//         }
//     },
    
    
// });
