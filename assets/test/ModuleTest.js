const Circle = require('Circle');
const Component = require('Component');

let width = 800;
let height = 800;

class TestWorld extends Component{
    static get defineName(){
        return 'TestWorld'
    }
    constructor(){
        super();
       
    }
    remove(collider,updating=false){
    
    }
    insert(collider,updating=false){
       
    }
    potentials(collider){
      
    }
    draw(context){
     
    }
}
module.exports = {
    name: 'Test',
    desc: '测试模块'
    // onLoad: function(ecs) {
    //     console.log("测试加载");
    // }
};



// module.exports = {
//     name:'PhysicTest',
//     onLoad:function (ecs) {
//         console.log("开始初始化ECS");
//         ecs.registerComponent(Circle);
//         ecs.registerSystem({
//             name:'updating',
//             components:[Collider,[Circle,Polygon]],
//             update:function (ent,dt,now,ecs) {
//                 let cCollider = ent.get('Collider');
//                 cCollider.updateBorder();
//                 let world = ecs.getSingleton(PhysicWorld);
//                 world.remove(cCollider,true);
//                 world.insert(cCollider,true);
//             }
//         });

//         ecs.registerSystem({
//             name:'collision',
//             enable:false,
//             components:[Collider,[Circle,Polygon],Velocity],
//             update:function (ent,dt,now,ecs) {
//                 let world = ecs.getSingleton(PhysicWorld);
//                 let colliderA = ent.get('Collider');
//                 let posA = ent.get('Polygon')||ent.get('Circle');
//                 let velA = ent.get('Velocity')||ent.get('Velocity');
//                 let result = new Contact();
//                 let potentials = world.potentials(ent);
//                 for(const colliderB of potentials) {
//                     if(colliderA.collide(colliderB, result)) {

//                         let posB = colliderB.getSibling('Polygon')||colliderB.getSibling('Circle');
//                         let velB = colliderB.getSibling('Velocity')||colliderB.getSibling('Velocity');
//                         posA.x -= result.overlap * result.overlap_x;
//                         posA.y -= result.overlap * result.overlap_y;

//                         let velAN = velA.normalize();
//                         let speed = velA.speed;

//                         let dot = velAN.x * result.overlap_y + velAN.y * -result.overlap_x;

//                         velAN.x = 2 * dot * result.overlap_y - velAN.x;
//                         velAN.y = 2 * dot * -result.overlap_x - velAN.y;
//                         velAN.normalize(true);
//                         velA.x = velAN.x*speed;
//                         velA.y = velAN.y*speed;

//                         if (velB) {
//                             let velBN = velB.normalize();
//                             speed = velB.speed;
//                             dot = velBN.x * result.overlap_y + velBN.y * -result.overlap_x;
//                             velBN.x = 2 * dot * result.overlap_y - velBN.x;
//                             velBN.x = 2 * dot * -result.overlap_x - velBN.y;
//                             velBN.normalize(true);
//                             velB.x = velBN.x*speed;
//                             velB.y = velBN.y*speed;
//                         }
//                     }
//                 }
//             }
//         });

//         ecs.registerSystem({
//             name:'shapeRenderer',
//             components:[[Circle,Polygon]],
//             beforeUpdate:function (dt,now,ecs) {
//                 if (this.getSize()<1200) {
//                     ecs.spawnEntity('Circle',Dice.rng(-300,300),Dice.rng(-300,300),Dice.rng(3,8),1);
//                     ecs.spawnEntity('Polygon',Dice.rng(-300,300),Dice.rng(-300,300),[[-4, -4], [4, -4], [4, 4], [-4, 4]],Dice.rng(0,3),1);
//                 }
//                 let cCanvas = ecs.getSingleton('Canvas');
//                 cCanvas.clear();
//             },
//             update:(ent,dt,now,ecs) => {
//                 let cPolygon = ent.get('Polygon');
//                 let cCircle = ent.get('Circle');
//                 let cCanvas = ecs.getSingleton('Canvas');
//                 let context = cCanvas.getContext(Dice.rngInt(0,6));
//                 cPolygon && cPolygon.draw(context);
//                 cCircle && cCircle.draw(context);
//             },
//             afterUpdate:function (dt,now,ecs) {
//                 let cCanvas = ecs.getSingleton('Canvas');
//                 for (let i=0;i<7;i++) {
//                     cCanvas.getContext(i).strokeColor = cc.Color.BLUE;
//                     cCanvas.getContext(i).stroke();
//                 }
//             }
//         });

//         ecs.setSpawner('Polygon',function (ecs,x,y,points,rotation,scaleX,scaleY) {
//             let ent = ecs.createEntity();
//             ent.add(Polygon,x,y,points,rotation,scaleX,scaleY);
//             ent.add(Collider);
//             ecs.getSingleton(PhysicWorld).insert(ent);
//             return ent;
//         });
//         ecs.setSpawner('Polygon1',function (ecs,x,y,points,rotation,scaleX,scaleY) {
//             let ent = ecs.createEntity();
//             ent.add(Polygon,x,y,points,rotation,scaleX,scaleY);
//             ent.add(Collider);
//             ecs.getSingleton(PhysicWorld).insert(ent);
//             return ent;
//         });

//         ecs.setSpawner('Circle',function (ecs,x,y,radius,scale) {
//             let ent = ecs.createEntity();
//             ent.add(Circle,x,y,radius,scale);
//             ent.add(Collider);
//             let speed = ent.add(Velocity,1,1);
//             speed.angle = Dice.rng(0,360);
//             speed.speed = Dice.rng(34,60);
//             ecs.getSingleton(PhysicWorld).insert(ent);
//             return ent;
//         });
//         ecs.spawnEntity('Polygon1',-width/2, -height/2, [[0, 0], [width, 0]]);
//         ecs.spawnEntity('Polygon1',-width/2, -height/2, [[width, 0], [width, height]]);
//         ecs.spawnEntity('Polygon1',-width/2, -height/2, [[width, height], [0, height]]);
//         ecs.spawnEntity('Polygon1',-width/2, -height/2, [[0, height], [0, 0]]);
//         console.log(cc.macro.BATCH_VERTEX_COUNT);
//     }
// };