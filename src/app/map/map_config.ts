interface _AboutGame {
    width: number,
    height: number,
    ScaleFactor:number,
    backgroundColor: number,
  }
export const AboutGame:_AboutGame = {
      width: 1920,
      height: 1080,
      ScaleFactor:1,
      backgroundColor: 0xffffff,
    };

export let Game_Map:any ={
AssetsUrl:'./assets/map_assets/images/ASSETS/',
Base:'./assets/map_assets/images/MYTHOLOGY ISLAND-BLANK.jpg',
TileSize:98,
//example of assets to that should be present on the map
AssetsToAdd:[
{asset_name:'market (5)',tileX:3,tileY:3,Zindex:0,type:'image'},
{asset_name:'tree 6',tileX:5,tileY:2,Zindex:0,type:'image'},
{asset_name:'temple',tileX:15,tileY:6,Zindex:0,type:'image'},
//spritesheet animation
{asset_name:'brawler48x48',tileX:10,tileY:3,Zindex:0,type:'spritesheet'},
]
}

//gloabal reference to the game map
export let Game:any={
  Map:null
}








      