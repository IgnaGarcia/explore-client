import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SpaceXComponent } from './spacex.component';

@NgModule({
  declarations: [
    SpaceXComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [SpaceXComponent]
})
export class SpaceXModule { }