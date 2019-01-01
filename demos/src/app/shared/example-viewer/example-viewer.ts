import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'example-viewer',
  templateUrl: './example-viewer.html',
  encapsulation: ViewEncapsulation.None
})
export class ExampleViewer {
  @Input() example: any;
}
