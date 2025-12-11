import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]', //Анугляр можем вешать свои компоненты на нативные теги
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',  // <= вставка
  styles: ['']
})

export class SvgIcon {

  @Input() icon = ''  //Декоратор

  get href() {
      return `assets/svg/${this.icon}.svg#${this.icon}`;
  }
}



  // console.log(`/assets/svg/${this.icon}.svg#${this.icon}`)

//  selector: 'app-svg-icon', //Анугляр можем вешать свои компоненты на нативные теги
//   selector: 'svg' - все svg будут заменяться на компоненты
//   selector: 'svg[icon]' - все svg, у которых будет указываться атрибут icon
//   -- станут этим компонетом