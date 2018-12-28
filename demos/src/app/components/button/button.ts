import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './button.html'
})
export class Button implements OnInit {
  tabs: any[];
  activeTabIndex = 0;

  constructor(private router: Router) {
    this.tabs = [
      {
        label: 'Api',
        route: './api',
        index: 0
      }, {
        label: 'Examples',
        route: './examples',
        index: 1
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeTabIndex = this.tabs.indexOf(this.tabs.find(tab => tab.route === '.' + this.router.url));
      console.log(this.activeTabIndex)
    });
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
