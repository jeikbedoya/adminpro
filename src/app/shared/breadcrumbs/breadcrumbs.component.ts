import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { MetaDefinition } from '@angular/platform-browser/src/browser/meta';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor(
    public router: Router,
    public title: Title,
    public meta: Meta
  ) {

    this.getDataRoute()
      .subscribe( data => {
        this.label = data.titulo;
        //asigna el titulo a la pagina
        this.title.setTitle(this.label);

        const metaTag: MetaDefinition = {
          name: 'descripcion',
          content: this.label,
        };
        this.meta.updateTag(metaTag);
    });
  }

  getDataRoute() {
    return this.router.events
    .filter( evento => evento instanceof ActivationEnd )
    .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null )
    .map( (evento: ActivationEnd) => evento.snapshot.data );
  }

  ngOnInit() {
  }

}
