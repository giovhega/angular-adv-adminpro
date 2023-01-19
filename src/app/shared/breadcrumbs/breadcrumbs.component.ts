import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, pipe, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public title: string = '';
  public tituloSubs$: Subscription;
  constructor(private router: Router) {

    this.tituloSubs$ = this.getDataRoute().subscribe(({titulo}) => {
      this.title = titulo;
      document.title = `AminPro - ${titulo}`;
    });
  }
  ngOnDestroy(): void {
   this.tituloSubs$.unsubscribe();
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter(event => (<ActivationEnd>event).snapshot.firstChild === null),
      map(event => (<ActivationEnd>event).snapshot.data)
    );
  }

}
