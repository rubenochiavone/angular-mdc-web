import {
  AfterContentInit,
  ContentChildren,
  Directive,
  Input,
  NgModule,
  OnDestroy,
  QueryList
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink
} from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MdcTab } from '@angular-mdc/web';

@Directive({ selector: '[activeTabRouter]' })
export class ActiveTabRouter implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  @ContentChildren(MdcTab, { descendants: true }) tabs: QueryList<MdcTab>;
  @ContentChildren(RouterLink, { descendants: true }) links: QueryList<RouterLink>;

  @Input() routerLinkActiveOptions: { exact: boolean } = { exact: false };

  constructor(private _router: Router) {
    this._router.events
      .pipe(takeUntil(this._destroyed),
        filter(event => event instanceof NavigationEnd))
      .subscribe(_ => {
        this.update();
      });
  }

  ngAfterContentInit(): void {
    this.links.changes
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => { this.update(); });

    this.update();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private update(): void {
    if (!this.links || !this._router.navigated) { return; }

    Promise.resolve().then(() => {
      const hasActiveLinks = this._hasActiveLinks();

      if (hasActiveLinks) {
        const activeLinkIndex = this.links.toArray().findIndex((_) =>
          this._router.isActive(_.urlTree, this.routerLinkActiveOptions.exact));

        if (activeLinkIndex > -1) {
          this.tabs.toArray()[activeLinkIndex].getTabBarParent().activateTab(activeLinkIndex);
        }
      }
    });
  }

  private _isLinkActive(router: Router): (link: (RouterLink)) => boolean {
    return (link: RouterLink) =>
      router.isActive(link.urlTree, this.routerLinkActiveOptions.exact);
  }

  private _hasActiveLinks(): boolean {
    return this.links.some(this._isLinkActive(this._router));
  }
}

@NgModule({
  declarations: [ActiveTabRouter],
  exports: [ActiveTabRouter]
})
export class ActiveTabRouterModule { }
