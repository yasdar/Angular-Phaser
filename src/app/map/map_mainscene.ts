import { Game_Map,Game } from "./map_config";

export class MainScene extends Phaser.Scene {
   
  Base!:Phaser.GameObjects.Image;
  ScaleW!:number;
  AssetToAdd!:Array<any>;
  Assets_layer!:Phaser.GameObjects.Container;
 Grid_layer!:Phaser.GameObjects.Container;

 TXT!:Phaser.GameObjects.Text;
 AllRect:Array<any>=[];
  constructor() {
    super({ key: 'MainScene' })
  }
  create() {
    //add the map base image
    this.Base = this.add.image(this.camX(0.5),this.camY(0.5),'BaseMap');
    this.ScaleW = this.cameras.main.width/ this.Base.width;
    this.Base.setScale(this.ScaleW);
      //save all added assets in this array
     this.AssetToAdd=[];
     //layer contain all added assets
     this.Assets_layer = this.add.container();
     //global function to add assets
     Game.Map.AddItem = this.AddItem.bind(this);
     //global function to remove assets
     Game.Map.RemoveItems = this.RemoveFromMap.bind(this);
     //global function to hide grid
     Game.Map.TGV = this.ToggleGridVisibilty.bind(this);
     //global function to ZoomIn
     Game.Map.ZoomIn = this.ZoomIn.bind(this);
     //global function to ZoomOut
     Game.Map.ZoomOut = this.ZoomOut.bind(this);

    //add assets defined in the AssetsToAdd
    Game_Map.AssetsToAdd.forEach((item:any)=>{
      if(item.type == 'image'){
      this.AddItem(item.asset_name,item.tileX,item.tileY,item.Zindex,item.type)
      }else if(item.type == 'spritesheet'){
         // Animation set
         this.anims.create({
          key: 'walk',
          frames: this.anims.generateFrameNumbers(item.asset_name, { frames: [ 0, 1, 2, 3 ] }),
          frameRate: 8,
          repeat: -1
      });
      const cody =this.add.sprite(this.getX(10),this.getY(3),item.asset_name);
      cody.setScale(3);
      cody.play('walk');
      }
    })

      this.Grid_layer = this.add.container();
      this.Grid_layer.setVisible(false);
      this.Add_grid();
    
 
  }

AddItem(asset_name:string,tileX:number,tileY:number,Zindex:number,type:'image'|'spritesheet'|'atlas'){
/**
 * asset_name:name of the image in the Assets folder
 * tileX:x coordinate
 * tileY: y coordinate
 * Zindex : depth value
 * type:'image'|'spritesheet'|'atlas'
 */
this.AssetToAdd.push({
  "asset_name":asset_name,
  "tileX":tileX,
  "tileY":tileY,
  "Zindex":Zindex,
  "type":type,

  "added":false,
   element:null
})
 //textture doesn't exist , load image and create
 if( !this.textures.exists(asset_name) ){this.loadImage(asset_name);}
 //texture already used , create image
 else{ this.AddToMap(); }
  }
  loadImage(image_name:string){
    this.load.image(image_name,Game_Map.AssetsUrl+image_name+'.png')
    //all assets loaded
    .on('filecomplete',this.AddToMap,this)
    //loading error
    .on('loaderror',(a:any)=>{
      console.log('Error loading : ',image_name,"plz check name,path,format :",a.url);
    },this)
    this.load.start();
  }
  AddToMap(){
    this.AssetToAdd.forEach((item)=>{
      if(!item.added){
        console.log("adding",item);
        let sp:Phaser.GameObjects.Sprite = this.add.sprite(this.getX(item.tileX),this.getY(item.tileY),item.asset_name);
        sp.setDepth(item.Zindex);
        this.Assets_layer.add(sp);
        sp.name =item.asset_name;
        item.element = sp;
        item.added = true;
      }
    })
  }
  RemoveFromMap(tileX:number,tileY:number){
    this.AssetToAdd.forEach((item)=>{
      if(item.added && item.element!=null){
        
        if(item.tileX == tileX && item.tileY == tileY){
          console.log("remove");

          item.element.destroy();
          item.element = null;
          item.added = true;

        }
       
      }
    })
  }

  //Utils
  camX(x:number){return this.cameras.main.width*x;}
  camY(y:number){return this.cameras.main.height*y;}
  getX(tileX:number){return (tileX*Game_Map.TileSize)+Game_Map.TileSize*0.5;}
  getY(tileY:number){return (tileY*Game_Map.TileSize)+Game_Map.TileSize*0.5;}
  getImageKey(value:string){
    let key = value.replace('.jpg','');
    key = key.replace('.png','');
    return key;
  }
  Add_grid(){
    this.AllRect=[];
    var style = { font: "bold 17px Arial", fill: "#ffffff"};
    this.TXT = this.add.text(0,0,"X", style).setOrigin(0.5,0.5);
    for( let i=0 ; i < Math.round(this.cameras.main.width/Game_Map.TileSize) ; i++){
      for( let j=0 ; j < Math.round(this.cameras.main.height/Game_Map.TileSize) ; j++){
      var r:Phaser.GameObjects.Rectangle = this.add.rectangle(i*Game_Map.TileSize, j*Game_Map.TileSize, Game_Map.TileSize, Game_Map.TileSize,0x000000,0.1).setOrigin(0,0)
      r.setStrokeStyle(1, 0x000000);
      //this.add.text(r.x+Game_Map.TileSize*0.5,r.y+Game_Map.TileSize*0.5, "X:"+i+'\nY:'+j, style).setOrigin(0.5,0.5);
      this.Grid_layer.add(r);
      this.AllRect.push({R:r,I:i,J:j});
    }
    }
  
   this.Grid_layer.add(this.TXT);

   this.AllRect.forEach((rect:any)=>{
    rect.R.setInteractive();
    rect.R.on('pointerdown',()=>{
      this.Showthere(rect.R.x,rect.R.y,rect.I,rect.J)
    })
   })
   console.log(this.AllRect[0].x,this.AllRect[0].y)
   console.log(this.AllRect[1].x,this.AllRect[1].y)
   
  }
  Showthere(x:any,y:any,i:any,j:any){
    this.Grid_layer.getIndex
    this.TXT.setPosition(x+Game_Map.TileSize*0.5,y+Game_Map.TileSize*0.5);
    this.TXT.setText("tileX:"+i+'\ntileY:'+j)
  }
  ToggleGridVisibilty(){
    console.log('okok')
    this.Grid_layer.setVisible( !this.Grid_layer.visible );
  }ZoomIn(tileX:number,tileY:number){
    this.cameras.main.pan(this.getX(tileX), this.getY(tileY), 2000);
    this.cameras.main.zoomTo(3, 2000);
  }ZoomOut(){
    this.cameras.main.pan(1920/2,1080/2, 2000);
    this.cameras.main.zoomTo(1, 2000);
  }
}