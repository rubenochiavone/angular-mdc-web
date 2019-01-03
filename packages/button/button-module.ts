import { NgModule } from '@angular/core';

import { MdcButton, MdcButtonLabel } from './button';

@NgModule({
  exports: [MdcButton, MdcButtonLabel],
  declarations: [MdcButton, MdcButtonLabel]
})
export class MdcButtonModule { }
