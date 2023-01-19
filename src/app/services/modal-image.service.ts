import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hiddenModal: boolean = true;
  public type!: 'usuarios' | 'medicos' | 'hospitales';
  public id: string = '';
  public img: string = '';

  public newImage : EventEmitter<string> = new EventEmitter<string>();

  get hiddenModal() {
    return this._hiddenModal;
  }

  showModal(
    type: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img'
  ) {
    this._hiddenModal = false;
    this.type = type;
    this.id = id;
    this.img = img;

    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${type}/${img}`;
    }
  }

  closeModal() {
    this._hiddenModal = true;
  }

  constructor() { }
}
