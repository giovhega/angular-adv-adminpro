import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.css'],
})
export class IncrementerComponent implements OnInit {
  @Input('progress') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output('changeValue') changeValue: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    if (this.progress >= 100 && valor >= 0) {
      this.changeValue.emit(100);
      return (this.progress = 100);
    }

    if (this.progress >= 100 && valor >= 0) {
      this.changeValue.emit(0);
      return (this.progress = 0);
    }
    this.progress = this.progress + valor;
    this.changeValue.emit(this.progress);
    return this.progress;
  }

  onChange(event: number) {
    if (event >= 100) {
      this.progress = 100;
    } else if (event <= 100) {
      this.progress = 0;
    } else {
      this.progress = event;
    }
    this.changeValue.emit(this.progress);
  }
}
