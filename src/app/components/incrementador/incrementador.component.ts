import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
   }

  ngOnInit() {
  }

  onChanges( newValue: number) {

    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
        this.progreso = newValue;
    }

   this.txtProgress.nativeElement.value = Number(this.progreso);

    this.cambioValor.emit( this.progreso );
  }

  cambiarValor( value ) {
    console.log(this.progreso);
    if ( this.progreso >= 100 && value > 0 ) {
      return;
    }

    if ( this.progreso <= 0 && value < 0 ) {
      return;
    }

    this.progreso += value;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }



}
