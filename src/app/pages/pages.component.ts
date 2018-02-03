import { Component, OnInit } from '@angular/core';

declare var init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    init_plugins();
  }

}
