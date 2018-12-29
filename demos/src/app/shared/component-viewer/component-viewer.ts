import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

class Tabs {
  label: string;
  route: string;
  index: number;
}

export class ComponentView {
  name: string;
  description: string;
  importCode: string;
  tabs: Tabs[];

  constructor(name: string, description: string, importCode: string, tabs?: Tabs[]) {
    this.name = name;
    this.description = description;
    this.importCode = importCode;
    this.tabs = tabs;
  }
}

@Component({
  selector: 'component-viewer',
  templateUrl: './component-viewer.html',
  encapsulation: ViewEncapsulation.None
})
export class ComponentViewer implements OnInit {
  activeTabIndex = 0;
  componentView: ComponentView;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeTabIndex = this.componentView.tabs.indexOf(this.componentView.tabs.find(tab =>
        tab.route === '.' + this.router.url));
      console.log(this.activeTabIndex);
    });
  }
}
