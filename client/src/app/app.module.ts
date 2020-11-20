import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ColorPhotoshopModule  } from 'ngx-color/photoshop';

import { AppComponent } from './app.component';
import { SocketService } from '../socket.service';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SocketErrorBarComponent } from './components/socket-error-bar/socket-error-bar.component';
import { DiceRollViewComponent } from './components/dice-roll-view/dice-roll-view.component';
import { D20Component } from './components/dice-roll-view/components/d20/d20.component';
import { D12Component } from './components/dice-roll-view/components/d12/d12.component';
import { D10Component } from './components/dice-roll-view/components/d10/d10.component';
import { D100Component } from './components/dice-roll-view/components/d100/d100.component';
import { D8Component } from './components/dice-roll-view/components/d8/d8.component';
import { D6Component } from './components/dice-roll-view/components/d6/d6.component';
import { D4Component } from './components/dice-roll-view/components/d4/d4.component';
import { D3Component } from './components/dice-roll-view/components/d3/d3.component';
import { D2Component } from './components/dice-roll-view/components/d2/d2.component';
import { DragToRotateDirective } from './directives/drag-to-rotate.directive';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { JoinServerComponent } from './components/join-server/join-server.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragToMoveDirective } from './directives/drag-to-move.directive';
import { BattleMapViewComponent } from './components/battle-map-view/battle-map-view.component';
import { BattleMapComponent } from './components/battle-map-view/components/battle-map/battle-map.component';
import { TokenContainerComponent } from './components/battle-map-view/components/token-container/token-container.component';
import { TokenModalComponent } from './components/battle-map-view/components/modals/token-modal/token-modal.component';
import { ModalBaseComponent } from './components/battle-map-view/components/modals/modal-base/modal-base.component';
import { EditTokenModalComponent } from './components/battle-map-view/components/modals/edit-token-modal/edit-token-modal.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SocketErrorBarComponent,
    DiceRollViewComponent,
    D20Component,
    D12Component,
    D10Component,
    D100Component,
    D8Component,
    D6Component,
    D4Component,
    D3Component,
    D2Component,
    DragToRotateDirective,
    JoinServerComponent,
    DragToMoveDirective,
    BattleMapViewComponent,
    BattleMapComponent,
    TokenContainerComponent,
    TokenModalComponent,
    ModalBaseComponent,
    EditTokenModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    ColorPhotoshopModule,
    Ng5SliderModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
