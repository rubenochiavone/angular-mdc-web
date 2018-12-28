import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { ButtonRoutingModule, ROUTE_DECLARATIONS } from './button-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ButtonRoutingModule
  ],
  declarations: [ROUTE_DECLARATIONS]
})
export class ButtonModule { }
