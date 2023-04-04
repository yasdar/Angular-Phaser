import { Game_Map } from "./map_config";


export class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PreloadScene' })
    }
    preload() {
    console.log("--preload--");
    this.load.on('progress', this.fileComplte,this);
    this.load.on('filecomplete', this.complete,this);
    //load all game assets
    this.load.image('BaseMap',Game_Map.Base);

    Game_Map.AssetsToAdd.forEach((item:any)=>{
      if(item.type == 'image'){
        this.load.image(item.asset_name,Game_Map.AssetsUrl+item.asset_name+'.png');
        console.log(item.type,item.asset_name)
      }
      else if(item.type == 'spritesheet'){
        this.load.spritesheet(item.asset_name,Game_Map.AssetsUrl+item.asset_name+'.png', { frameWidth: 48, frameHeight: 48 });
      }
    })
    }
    create() {
      this.scene.start('MainScene');
    }
    fileComplte(progress:any){
    //console.log("loading...",(progress));
     }
     complete(){
      //console.log("all assets loaded");
    }
  }
  