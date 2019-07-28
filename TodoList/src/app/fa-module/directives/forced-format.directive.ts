import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[_format]'
})
export class ForcedFormatDirective {

  @Input('_format') formatType: string;
  native: HTMLInputElement;


  constructor(private ref: ElementRef) {
    this.native = this.ref.nativeElement;

    if(this.native.tagName !== 'INPUT'){
      throw new Error(`
      "_format" directive binded on ${this.native.tagName} 
      "_format" directive bindable only on INPUT Elements `
      )
    }
  }

  @HostListener('blur') formatValueOnBlur(){

    let value = this.native.value as string
    if(!value) return;

    switch(this.formatType){

      case 'capital-each':
      value = value.split(' ').map(item => {
        if(item){
          return item[0].toUpperCase() + item.slice(1)
        }
      }).join(' ');
      break;
    }

    this.native.value = value
  }

}
