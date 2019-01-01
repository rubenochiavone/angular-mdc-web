import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';

import { MaterialModule } from './material.module';
import { ComponentViewer } from './shared/component-viewer';
import { ExampleViewer } from './shared/example-viewer';
import { ActiveTabRouterModule } from './shared/active-tab-router';

const SHARED_DECLARATIONS = [
  ComponentViewer,
  ExampleViewer
];

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml }
  ];
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    ActiveTabRouterModule,
    HighlightModule.forRoot({ languages: hljsLanguages })
  ],
  declarations: [SHARED_DECLARATIONS],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ActiveTabRouterModule,
    SHARED_DECLARATIONS
  ]
})
export class SharedModule { }
