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
  importCode: string;
  tabs?: Tabs[];
  references?: Reference[];

  constructor(name: string, description: string, importCode: string) {
    this.name = name;
    this.description = description;
    this.importCode = importCode;
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
