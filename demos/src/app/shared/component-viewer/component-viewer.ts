import { Component, ViewEncapsulation } from '@angular/core';

interface Reference {
  name: string;
  url: string;
}

interface Tabs {
  label: string;
  route: string;
}

export class ComponentView {
  name: string;
  description: string;
  references?: Reference[];
  importCode: string;
  tabs = [{
    label: 'Api',
    route: './api'
  }, {
    label: 'Sass Mixins',
    route: './sass'
  }, {
    label: 'Examples',
    route: './examples'
  }];

  constructor(name: string, description: string, importCode: string, tabs?: Tabs[]) {
    this.name = name;
    this.description = description;
    this.importCode = importCode;
    if (tabs) {
      this.tabs = tabs;
    }
  }
}

@Component({
  selector: 'component-viewer',
  templateUrl: './component-viewer.html',
  encapsulation: ViewEncapsulation.None
})
export class ComponentViewer {
  componentView: ComponentView;
}
