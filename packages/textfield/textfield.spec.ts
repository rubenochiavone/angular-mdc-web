import {Component, DebugElement, Provider, ViewChild} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, flush, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Platform} from '@angular/cdk/platform';

import {
  dispatchFakeEvent,
  dispatchTouchEvent,
  dispatchMouseEvent
} from '@angular-mdc/web/testing';

import {
  MdcTextField,
  MdcTextFieldModule,
  MDC_TEXT_FIELD_DEFAULT_OPTIONS,
} from './index';
import {MdcIconModule} from '@angular-mdc/web/icon';

function configureMdcTestingModule(declarations: any[], providers: Provider[] = []) {
  let platform: {isBrowser: boolean};

  // Set the default Platform override that can be updated before component creation.
  platform = {isBrowser: true};

  TestBed.configureTestingModule({
    imports: [
      MdcTextFieldModule,
      MdcIconModule,
      FormsModule,
    ],
    declarations: declarations,
    providers: [
      {provide: Platform, useFactory: () => platform},
      ...providers
    ],
  }).compileComponents();
}

describe('MdcTextField', () => {
  let fixture: ComponentFixture<any>;
  let platform: {isBrowser: boolean};

  beforeEach(async(() => {
    configureMdcTestingModule([
      SimpleTextfield,
      TextFieldTestWithValue,
      TextFieldWithIcons,
      DefaultTextField
    ]);
  }));

  describe('Tests for SSR', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcTextField;
    let testComponent: SimpleTextfield;

    beforeEach(() => {
      // Set the default Platform override that can be updated before component creation.
      platform = {isBrowser: false};

      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-text-field by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-text-field', 'Expected to have mdc-text-field');
    });
  });

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let testInstance: MdcTextField;
    let testComponent: SimpleTextfield;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      testInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-text-field by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-text-field', 'Expected to have mdc-text-field class');
    });

    it('#should apply class fullwidth on property', fakeAsync(() => {
      testComponent.isFullwidth = true;
      fixture.detectChanges();
      flush();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--fullwidth')).toBe(true);
    }));

    it('#should apply class outlined', fakeAsync(() => {
      testComponent.outlined = true;
      fixture.detectChanges();
      flush();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--outlined')).toBe(true);
    }));

    it('#should apply class outlined and not set it again', fakeAsync(() => {
      testComponent.outlined = true;
      fixture.detectChanges();
      flush();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--outlined')).toBe(true);

      testComponent.outlined = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--outlined')).toBe(true);
    }));

    it('#should not be disabled', fakeAsync(() => {
      expect(testInstance.disabled).toBeFalsy();
    }));

    it('#should be disabled', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      flush();

      expect(testInstance.disabled).toBe(true);
    }));

    it('#should not be read only', fakeAsync(() => {
      expect(testInstance.readonly).toBeFalsy();
    }));

    it('#should be read only', fakeAsync(() => {
      testComponent.readonly = true;
      fixture.detectChanges();
      flush();

      expect(testInstance.readonly).toBe(true);
    }));

    it('#should set validity based on input element validity', fakeAsync(() => {
      testInstance.valid = true;
      testInstance.valid = true; // check to ensure it doesn't run change again
      fixture.detectChanges();
      flush();

      expect(testInstance.valid).toBe(true);
    }));

    it('#should set required to true', fakeAsync(() => {
      testComponent.required = true;
      fixture.detectChanges();
      flush();

      expect(testInstance.required).toBe(true);
    }));

    it('#should set required to true and valid to true', fakeAsync(() => {
      testInstance.valid = true;
      fixture.detectChanges();
      testComponent.required = true;
      fixture.detectChanges();

      expect(testInstance.required).toBe(true);
    }));

    it('#should set useNativeValidation to true', fakeAsync(() => {
      testComponent.useNativeValidation = true;
      testInstance.useNativeValidation = true; // check to ensure it doesn't run change again
      fixture.detectChanges();
      flush();

      expect(testInstance.useNativeValidation).toBe(true);
      expect(testInstance.isBadInput()).toBe(false);
    }));

    it('#should focus on underlying input element when focus() is called', fakeAsync(() => {
      testComponent.outlined = true;
      fixture.detectChanges();
      expect(document.activeElement).not.toBe(testInstance._input.nativeElement);
      testInstance.focus();
      fixture.detectChanges();
      flush();

      expect(document.activeElement).toBe(testInstance._input.nativeElement);
    }));

    it('change type', fakeAsync(() => {
      testComponent.myType = '';
      fixture.detectChanges();
      flush();

      expect(testInstance.type).toBe('text');
    }));

    it('add inputmode', fakeAsync(() => {
      testComponent.inputMode = 'tel';
      fixture.detectChanges();
      flush();

      expect(testInstance.inputmode).toBe('tel');
    }));

    it('handles blur event', fakeAsync(() => {
      textFieldNativeElement.blur();
      fixture.detectChanges();
    }));

    it('handles focus event', fakeAsync(() => {
      textFieldNativeElement.focus();
      fixture.detectChanges();
    }));

    it('handles click event', fakeAsync(() => {
      textFieldNativeElement.click();
      fixture.detectChanges();
    }));

    it('handles animationend event', fakeAsync(() => {
      dispatchFakeEvent(testInstance._floatingLabel!.elementRef.nativeElement, 'animationend');
    }));

    it('handles transitionend event', fakeAsync(() => {
      testComponent.outlined = false;
      fixture.detectChanges();
      flush();

      dispatchFakeEvent(testInstance._lineRipple!.elementRef.nativeElement, 'transitionend');
    }));

    it('expect trailing icon to be defined', fakeAsync(() => {
      expect(testInstance.trailingIcon).toBeDefined();
    }));
  });

  describe('textfield with icons', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let testInstance: MdcTextField;
    let testComponent: TextFieldWithIcons;

    beforeEach(() => {
      fixture = TestBed.createComponent(TextFieldWithIcons);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      testInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should be disabled', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testInstance.disabled).toBe(true);
    });
  });

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let testInstance: MdcTextField;
    let testComponent: TextFieldTestWithValue;

    beforeEach(() => {
      fixture = TestBed.createComponent(TextFieldTestWithValue);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      testInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should set value to foo', fakeAsync(() => {
      testInstance.value = 'foo';
      fixture.detectChanges();
      flush();

      expect(testInstance.value).toBe('foo');
    }));

    it('#should call OnInput', fakeAsync(() => {
      spyOn(testComponent, 'onInput');

      textFieldDebugElement.nativeElement.value = 'text';
      dispatchFakeEvent(textFieldNativeElement, 'input');
      fixture.detectChanges();
      expect(testComponent.onInput).toHaveBeenCalledTimes(1);
    }));

    it('#should handle touch event', fakeAsync(() => {
      testInstance._input.nativeElement.focus();
      fixture.detectChanges();

      dispatchTouchEvent(textFieldNativeElement, 'touchstart');
      fixture.detectChanges();
      tick(300);

      dispatchTouchEvent(textFieldNativeElement, 'touchstart');
      dispatchMouseEvent(testInstance._input.nativeElement, 'mousedown');
      dispatchMouseEvent(testInstance._input.nativeElement, 'mousedown');
      fixture.detectChanges();
      tick(300);

      document.body.focus();
      fixture.detectChanges();
    }));
  });
});

it('should be able to provide default values through an injection token', () => {
  configureMdcTestingModule([DefaultTextField], [{
    provide: MDC_TEXT_FIELD_DEFAULT_OPTIONS,
    useValue: {
      outlined: true
    }
  }]);
  const fixture = TestBed.createComponent(DefaultTextField);
  fixture.detectChanges();
  const textfield = fixture.componentInstance.textfield;
  expect(textfield.outlined).toBe(true);
});

it('should be able to provide default values through an injection token', () => {
  configureMdcTestingModule([DefaultTextField], [{
    provide: MDC_TEXT_FIELD_DEFAULT_OPTIONS,
    useValue: {
      outlined: null
    }
  }]);
  const fixture = TestBed.createComponent(DefaultTextField);
  fixture.detectChanges();
  const textfield = fixture.componentInstance.textfield;
  expect(textfield.outlined).toBe(false);
});

@Component({
  template: `
  <mdc-form-field>
    <mdc-text-field
      [(ngModel)]="myModel"
      label="Username"
      [type]="myType"
      [inputmode]="inputMode"
      [tabIndex]="1"
      [charCounter]="charCounter"
      [outlined]="outlined"
      [value]="value"
      [fullwidth]="isFullwidth"
      [required]="required"
      [readonly]="readonly"
      [disabled]="disabled"
      [useNativeValidation]="useNativeValidation"
      (input)="onInput($event)"
      (change)="onChange($event)"
      (blur)="onBlur($event)">
      <mdc-icon mdcTextFieldIcon leading>person</mdc-icon>
      <mdc-icon mdcTextFieldIcon trailing>person</mdc-icon>
    </mdc-text-field>
  </mdc-form-field>
  `,
})
class SimpleTextfield {
  myModel: string = 'Test';
  myType: string = 'text';
  inputMode?: string;
  disabled: boolean;
  isFullwidth: boolean;
  outlined: boolean;
  required: boolean;
  readonly: boolean;
  useNativeValidation: boolean = false;
  charCounter: boolean = true;

  onInput(value: any) {}
  onChange(value: any) {}
  onBlur(event: any) {}
}

@Component({
  template: `
    <mdc-text-field
      label="Username"
      (input)="onInput($event)"
      (change)="onChange($event)"
      [value]="value">
    </mdc-text-field>
  `,
})
class TextFieldTestWithValue {
  value: string = 'my-test';

  onInput: (value: any) => void = () => {};
  onChange(value: any) {}
}

@Component({
  template: `
<mdc-text-field [disabled]="disabled" label="Textfield with icon">
  <mdc-icon mdcTextFieldIcon leading>phone</mdc-icon>
</mdc-text-field>`,
})
class TextFieldWithIcons {
  disabled: boolean = false;
}

@Component({
  selector: 'default-text-field',
  template: `<mdc-text-field label="Example"></mdc-text-field>`
})
class DefaultTextField {
  @ViewChild(MdcTextField) textfield!: MdcTextField;
}
