import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  linkTheme = document.querySelector('#theme');
  constructor() {
    let theme = localStorage.getItem('theme') || `./assets/css/colors/red.css`;
    this.linkTheme?.setAttribute('href', theme);
  }


  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
   }


   checkCurrentTheme() {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');
    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currenTheme = this.linkTheme?.getAttribute('href');
      if ( btnThemeUrl === currenTheme ) {
        element.classList.add('working');
      }
    });


  }


}
