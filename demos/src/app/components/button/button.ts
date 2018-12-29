import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({
  templateUrl: './button.html'
})
export class Button implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Button',
      'Buttons allow users to take actions, and make choices, with a single tap.',
      "import { MdcButtonModule } from '@angular-mdc/web';",
      [{
        label: 'Api',
        route: './api',
        index: 0
      }, {
        label: 'Examples',
        route: './examples',
        index: 1
      }]
    );
  }
}

@Component({
  templateUrl: './api.html'
})
export class Api { }

@Component({
  templateUrl: './examples.html'
})
export class Examples { }
