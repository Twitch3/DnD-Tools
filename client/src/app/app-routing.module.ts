import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DiceRollViewComponent } from './components/dice-roll-view/dice-roll-view.component';
import { JoinServerComponent } from './components/join-server/join-server.component';
import { BattleMapViewComponent } from './components/battle-map-view/battle-map-view.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'dice', component: DiceRollViewComponent },
  { path: 'map', component: BattleMapViewComponent },
  { path: 'join', component: JoinServerComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
