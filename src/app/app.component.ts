import { Component } from '@angular/core';
import { Game } from './map/map_config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app component title';

  AddSomething(){
    // Game.Map.AddItem('image name',tileX,tileY,Depth,'type');
    Game.Map.AddItem('market (4)',8,3,0,'image');
  }

  RemoveSomething(){
   // Game.Map.RemoveItems(tileX,tileY);
   Game.Map.RemoveItems(8,3);
  }

  ToggleGrid(){

    Game.Map.TGV();

  }

  ZoomOnTile(x:number,y:number){

    Game.Map.ZoomIn(x,y);

  }

  ZoomOutTile(){

    Game.Map.ZoomOut();

  }

}
