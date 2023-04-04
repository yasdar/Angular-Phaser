import { Component } from '@angular/core';
import Phaser from 'phaser';
import { AboutGame, Game } from './map_config';
import { PreloadScene } from './map_preloader';
import { MainScene } from './map_mainscene';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent {

  constructor(){
    Game.Map = new Phaser.Game({
      type: Phaser.CANVAS,
      backgroundColor: AboutGame.backgroundColor,
      scale: {
          parent: 'MapDiv',
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: AboutGame.width,
          height: AboutGame.height,
        },
        scene: [PreloadScene,MainScene]
    });
  }
  
}
