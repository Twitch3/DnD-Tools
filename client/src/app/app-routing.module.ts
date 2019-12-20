import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DiceRollViewComponent } from './components/dice-roll-view/dice-roll-view.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { MapEditorComponent } from './components/map-editor/map-editor.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'chat', component: ChatViewComponent },
  { path: 'dice', component: DiceRollViewComponent },
  { path: 'map', component: MapViewComponent },
  { path: 'edit', component: MapEditorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
