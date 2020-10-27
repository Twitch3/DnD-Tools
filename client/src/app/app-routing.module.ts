import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DiceRollViewComponent } from './components/dice-roll-view/dice-roll-view.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { JoinServerComponent } from './components/join-server/join-server.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'chat', component: ChatViewComponent },
  { path: 'dice', component: DiceRollViewComponent },
  { path: 'map', component: MapViewComponent },
  { path: 'join', component: JoinServerComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
