import { ElementRef } from '@angular/core';
import { BgColorDirective } from './bg-color.directive';

describe('BgColorDirective', () => {
  it('should create an instance', () => {
    let el: ElementRef;
    const directive = new BgColorDirective(el);
    expect(directive).toBeTruthy();
  });
});
