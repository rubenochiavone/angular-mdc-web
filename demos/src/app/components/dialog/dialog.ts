import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {MdcDialog, MdcDialogRef, MDC_DIALOG_DATA, MdcDialogComponent} from '@angular-mdc/web/dialog';
import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

export interface DialogData {
  first: string;
  last: string;
  email: string;
}

@Component({templateUrl: './usage.html'})
export class Usage {}

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcDialog (Service)',
          summary: 'Service to open MDC dialogs.',
          categories: [
            {
              name: 'Observables',
              items: [
                {name: `afterOpened: Observable<void>`, summary: `Gets an observable that is notified when the dialog is finished opening.`},
                {name: `afterClosed: Observable<R | undefined>`, summary: 'Gets an observable that is notified when the dialog is finished closing.'},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: `close(dialogResult?: any)`, summary: `Closes the dialog with optional returned result.`},
                {name: `open(component, config?: MdcDialogConfig)`, summary: 'Opens the dialog with optional configuration.'},
              ]
            },
            {
              name: 'MdcDialogConfig',
              items: [
                {name: `id: string`, summary: `ID for the dialog. If omitted, a unique one will be generated.`},
                {name: `ariaLabel: string`, summary: 'Aria label to assign to the dialog element.'},
                {name: `ariaDescribedBy: string`, summary: `ID of the element that describes the dialog.`},
                {name: `clickOutsideToClose: boolean`, summary: `Close the dialog if user clicks on the backdrop. (Default: true)`},
                {name: `escapeToClose: boolean`, summary: `Enable or disable close on escape key (Default: true).`},
                {name: `scrollable: boolean`, summary: `Applied automatically when the dialog has overflowing content to warrant scrolling.`},
                {name: `buttonsStacked: boolean`, summary: `Enable or disable the stacking of action buttons, if they can't fit on a single line.`},
                {name: `autoFocus: boolean`, summary: `Whether the dialog should focus the first focusable element on open. (Default: true)`},
                {name: `restoreFocus: boolean`, summary: `Whether the dialog should restore focus to the previously-focused element, after it's closed. (Default: true)`},
                {name: `componentFactoryResolver?: ComponentFactoryResolver`, summary: `Allows for a different 'ComponentFactoryResolver' to be passed in when creating a dialog.`},
                {name: `data: any`, summary: `Data that can be assigned inside child component.`},
              ]
            },
          ]
        },
        {
          header: 'MdcDialog (Directive)',
          summary: 'Mandatory. The root DOM element containing the surface and the container.',
          selectors: [
            'mdc-dialog',
          ],
          exportedAs: 'mdcDialog',
          categories: [
            {
              name: 'Methods',
              items: [
                {name: 'layout()', summary: 'Recalculates layout and automatically adds/removes modifier classes like --scrollable.'}
              ]
            }
          ]
        },
        {
          header: 'MdcDialogContainer',
          summary: 'Mandatory. Wrapper element needed to ensure flexbox behavior in IE 11.',
          selectors: [
            'mdc-dialog-container',
          ],
          exportedAs: 'mdcDialogContainer',
        },
        {
          header: 'MdcDialogSurface',
          summary: `Mandatory. The bounding box for the dialog's content.`,
          selectors: [
            'mdc-dialog-surface',
          ],
          exportedAs: 'mdcDialogSurface',
        },
        {
          header: 'MdcDialogTitle',
          summary: `Mandatory. The bounding box for the dialog's content.`,
          selectors: [
            'mdc-dialog-title',
            'mdcDialogTitle'
          ],
          exportedAs: 'mdcDialogTitle',
        },
        {
          header: 'MdcDialogContent',
          summary: 'Optional. Primary content area. May contain a list, a form, or prose.',
          selectors: [
            'mdc-dialog-content',
            'mdcDialogContent'
          ],
          exportedAs: 'mdcDialogContent',
        },
        {
          header: 'MdcDialogActions',
          summary: `Optional. Footer area containing the dialog's action buttons.`,
          selectors: [
            'mdc-dialog-actions',
            'mdcDialogActions'
          ],
          exportedAs: 'mdcDialogActions',
        },
        {
          header: 'MdcDialogButton',
          selectors: [
            'button[mdcDialogButton]',
            '[mdcDialogButton]'
          ],
          exportedAs: 'mdcDialogButton',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'default: boolean', summary: 'Indicates that this action button represents the default action.'}
              ]
            }
          ]
        },
        {
          header: 'MdcDialogAction',
          summary: 'Optional. Any element within a dialog may include themdcDialogAction directive.',
          selectors: [
            'mdcDialogAction="close"',
            'mdcDialogAction="accept"',
          ],
          exportedAs: 'mdcDialogAction',
        },
      ]
    };
  }
}

@Component({template: '<component-viewer></component-viewer>'})
export class Dialog implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Dialog',
      description: 'Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.',
      references: [{
        name: 'Material Design guidelines: Dialog',
        url: 'https://material.io/guidelines/components/dialogs.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-dialog/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-dialog/README.md#sass-mixins'},
      ],
      code: `import {MdcDialogModule} from '@angular-mdc/web/dialog';`,
      sass: `@use '@material/dialog/mdc-dialog';
@use '@material/dialog';`,
      tabs: [{
        label: 'Usage',
        route: './usage'
      }, ...this._componentViewer.defaultTabs]
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  constructor(public dialog: MdcDialog) {}

  openAlert() {
    const dialogRef = this.dialog.open(DialogAlert, {
      escapeToClose: false,
      clickOutsideToClose: false,
      buttonsStacked: false,
      id: 'my-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAutoFocus(autoFocus: boolean) {
    const dialogRef = this.dialog.open(DialogAlert, {
      autoFocus: autoFocus
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSimple() {
    const dialogRef = this.dialog.open(DialogSimple);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(DialogConfirmation);

    dialogRef.afterOpened().subscribe(() => {
      console.log('Dialog opened');
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openScrollable(scrollable: boolean = true) {
    const dialogRef = this.dialog.open(DialogScrollable, {
      scrollable: scrollable
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(DialogForm);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //
  // Examples
  //

  exampleTS = `import { MdcDialog, MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';

@Component({ templateUrl: './examples.html' })
export class Examples {
  constructor(public dialog: MdcDialog) { }`;

  exampleAlert = {
    html: `<button mdc-button (click)="openAlert()">Alert</button>`,
    ts: `${this.exampleTS}

  openAlert() {
    const dialogRef = this.dialog.open(DialogAlert, {
      escapeToClose: false,
      clickOutsideToClose: false,
      buttonsStacked: false,
      id: 'my-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}`,
    'Dialog-Alert.html': `<mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Discard draft?</mdc-dialog-title>
      <mdc-dialog-actions>
        <button mdcDialogButton mdcDialogAction="close">Cancel</button>
        <button mdcDialogButton mdcDialogAction="accept">Discard</button>
      </mdc-dialog-actions>
    </mdc-dialog-surface>
  </mdc-dialog-container>
</mdc-dialog>`,
    'dialog-alert.ts': `@Component({
  templateUrl: 'dialog-alert.html',
})
export class DialogAlert {
  constructor(public dialogRef: MdcDialogRef<DialogAlert>) { }
}`
  };

  exampleSimple = {
    html: `<button mdc-button (click)="openSimple()">Simple</button>`,
    ts: `${this.exampleTS}

  openSimple() {
    const dialogRef = this.dialog.open(DialogSimple);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}`,
    'dialog-simple.html': `<mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Select an account</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-list avatar>
          <mdc-list-item (click)="closeDialog()" cdkInitialFocus>
            <mdc-icon mdcListItemGraphic>person</mdc-icon>username@gmail.com
          </mdc-list-item>
          <mdc-list-item (click)="closeDialog()">
            <mdc-icon mdcListItemGraphic>person</mdc-icon>user02@gmail.com
          </mdc-list-item>
          <mdc-list-item (click)="closeDialog()">
            <mdc-icon mdcListItemGraphic>add</mdc-icon>add account
          </mdc-list-item>
        </mdc-list>
      </mdc-dialog-content>
    </mdc-dialog-surface>
  </mdc-dialog-container>
</mdc-dialog>`,
    'dialog-simple.ts': `@Component({
  templateUrl: 'dialog-simple.html',
})
export class DialogSimple {
  constructor(public dialogRef: MdcDialogRef<DialogSimple>) { }

  closeDialog(): void {
    this.dialogRef.close('Pizza');
  }
}`
  };

  exampleAutoFocus = {
    html: `<button mdc-button (click)="openAutoFocus(true)">Open focused initial element</button>
<button mdc-button (click)="openAutoFocus(false)">Open no focused element</button>`,
    ts: `${this.exampleTS}

  openAutoFocus(autoFocus: boolean) {
    const dialogRef = this.dialog.open(DialogAlert, {
      autoFocus: autoFocus
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}`,
    'dialog-alert.html': this.exampleAlert['Dialog-Alert.html'],
    'dialog-alert.ts': this.exampleAlert['dialog-alert.ts']
  };

  exampleConfirmation = {
    html: `<button mdc-button (click)="openConfirmation()">Open Confirmation</button>`,
    ts: `${this.exampleTS}

  openConfirmation() {
    const dialogRef = this.dialog.open(DialogConfirmation);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}`,
    'dialog-confirmation.html': `<mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Phone ringtone</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-list>
          <mdc-list-item>
            <mdc-radio mdcListItemGraphic name="demo-radio-set" checked></mdc-radio>
            Never Gonna Give You Up
          </mdc-list-item>
          <mdc-list-item>
            <mdc-radio mdcListItemGraphic name="demo-radio-set"></mdc-radio>
            Hot Cross Buns
          </mdc-list-item>
          <mdc-list-item>
            <mdc-radio mdcListItemGraphic name="demo-radio-set"></mdc-radio>
            None
          </mdc-list-item>
        </mdc-list>
      </mdc-dialog-content>
      <mdc-dialog-actions>
        <button mdcDialogButton mdcDialogAction="close">Cancel</button>
        <button mdcDialogButton default mdcDialogAction="accept">Ok</button>
      </mdc-dialog-actions>
    </mdc-dialog-surface>
  </mdc-dialog-container>
</mdc-dialog>`,
    'dialog-confirmation.ts': `@Component({
  templateUrl: 'dialog-confirmation.html',
})
export class DialogConfirmation {
  constructor(public dialogRef: MdcDialogRef<DialogConfirmation>,
    @Inject(MDC_DIALOG_DATA) public data: DialogData) { }
}`
  };

  exampleScrollable = {
    html: `<button mdc-button (click)="openScrollable()">Open Scrollable</button>`,
    ts: `${this.exampleTS}

  openScrollable() {
    const dialogRef = this.dialog.open(DialogScrollable, {
      scrollable: scrollable
    });
  }
}`,
    'dialog-scrollable.html': `<mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Read my novel?</mdc-dialog-title>
      <mdc-dialog-content>
        <p *ngFor="let lorem of lorems">{{lorem}}</p>
      </mdc-dialog-content>
      <mdc-dialog-actions>
        <button mdcDialogButton mdcDialogAction="close">Decline</button>
        <button mdcDialogButton mdcDialogAction="accept">Accept</button>
      </mdc-dialog-actions>
    </mdc-dialog-surface>
  </mdc-dialog-container>
</mdc-dialog>`,
    'dialog-scrollable.ts': `@Component({
  templateUrl: 'dialog-scrollable.html',
})
export class DialogScrollable {
  text = \`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,
  repudiandae dignissimos et quam velit autem mollitia tenetur,
  eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.
  Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,
  consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,
  excepturi!\`;
  lorems = Array(5).fill(this.text);

  constructor(public dialogRef: MdcDialogRef<DialogScrollable>) { }
}`
  };

  exampleDialogForm = {
    html: `<button mdc-button (click)="openForm()">Open Form</button>`,
    ts: `${this.exampleTS}

  openForm() {
    const dialogRef = this.dialog.open(DialogForm);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}`,
    'dialog-form.html': `<mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Create profile</mdc-dialog-title>
      <mdc-dialog-content>
        <form [formGroup]="profileForm" id="profileForm" (ngSubmit)="submit()" autocomplete="off">
          <mdc-form-field fluid>
            <mdc-text-field formControlName="first" label="First name" outlined></mdc-text-field>
            <mdc-helper-text persistent validation>*Required</mdc-helper-text>
          </mdc-form-field>
          <mdc-form-field fluid>
            <mdc-text-field formControlName="last" label="Last name" outlined></mdc-text-field>
            <mdc-helper-text persistent validation>*Required</mdc-helper-text>
          </mdc-form-field>
          <mdc-form-field fluid>
            <mdc-text-field type="email" formControlName="email" label="Email" maxlength="254"
             outlined></mdc-text-field>
            <mdc-helper-text validation>*Required</mdc-helper-text>
          </mdc-form-field>
        </form>
      </mdc-dialog-content>
      <mdc-dialog-actions>
        <button mdcDialogButton mdcDialogAction="close">Cancel</button>
        <button mdcDialogButton form="profileForm">Create</button>
      </mdc-dialog-actions>
    </mdc-dialog-surface>
  </mdc-dialog-container>
</mdc-dialog>`,
    'dialog-form.ts': `@Component({
  templateUrl: 'dialog-form.html',
})
export class DialogForm {
  constructor(public dialogRef: MdcDialogRef<DialogForm>,
    @Inject(MDC_DIALOG_DATA) public data: DialogData) { }

  profileForm = new FormGroup({
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  submit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.dialogRef.close();
  }
}`
  };
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Discard draft?</mdc-dialog-title>
        <mdc-dialog-actions>
          <button mdcDialogButton mdcDialogAction="close">Cancel</button>
          <button mdcDialogButton mdcDialogAction="accept">Discard</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
export class DialogAlert {
  constructor(public dialogRef: MdcDialogRef<DialogAlert>) {}
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Select an account</mdc-dialog-title>
        <mdc-dialog-content>
          <mdc-list avatar>
            <mdc-list-item (click)="closeDialog()" cdkFocusInitial>
              <mdc-icon mdcListItemGraphic>person</mdc-icon>username@gmail.com
            </mdc-list-item>
            <mdc-list-item (click)="closeDialog()">
              <mdc-icon mdcListItemGraphic>person</mdc-icon>user02@gmail.com
            </mdc-list-item>
            <mdc-list-item (click)="closeDialog()">
              <mdc-icon mdcListItemGraphic>add</mdc-icon>add account
            </mdc-list-item>
          </mdc-list>
        </mdc-dialog-content>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
export class DialogSimple {
  constructor(public dialogRef: MdcDialogRef<DialogSimple>) {}

  closeDialog(): void {
    this.dialogRef.close('Pizza');
  }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Read my novel?</mdc-dialog-title>
        <mdc-dialog-content>
          <p *ngFor="let lorem of lorems">{{lorem}}</p>
        </mdc-dialog-content>
        <mdc-dialog-actions>
          <button mdcDialogButton mdcDialogAction="close">Decline</button>
          <button mdcDialogButton mdcDialogAction="accept" cdkFocusInitial>Accept</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `
})
export class DialogScrollable {
  text = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,
  repudiandae dignissimos et quam velit autem mollitia tenetur,
  eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.
  Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,
  consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,
  excepturi!`;
  lorems = Array(5).fill(this.text);

  constructor(public dialogRef: MdcDialogRef<DialogScrollable>) {}
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Phone ringtone</mdc-dialog-title>
        <mdc-dialog-content>
          <mdc-list>
            <mdc-list-item>
              <mdc-radio mdcListItemGraphic name="demo-radio-set" checked></mdc-radio>
              Never Gonna Give You Up
            </mdc-list-item>
            <mdc-list-item>
              <mdc-radio mdcListItemGraphic name="demo-radio-set"></mdc-radio>
              Hot Cross Buns
            </mdc-list-item>
            <mdc-list-item>
              <mdc-radio mdcListItemGraphic name="demo-radio-set"></mdc-radio>
              None
            </mdc-list-item>
          </mdc-list>
        </mdc-dialog-content>
        <mdc-dialog-actions>
          <button mdcDialogButton mdcDialogAction="close">Cancel</button>
          <button mdcDialogButton default mdcDialogAction="accept">Ok</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
export class DialogConfirmation {
  @ViewChild(MdcDialogComponent, {static: false}) dialogComponent: MdcDialogComponent;
  constructor(public dialogRef: MdcDialogRef<DialogConfirmation>,
    @Inject(MDC_DIALOG_DATA) public data: DialogData) {}
}

@Component({
  templateUrl: './dialog-form-demo.html'
})
export class DialogForm {
  constructor(public dialogRef: MdcDialogRef<DialogForm>,
    @Inject(MDC_DIALOG_DATA) public data: DialogData) {}

  profileForm = new FormGroup({
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  submit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.dialogRef.close();
  }
}
