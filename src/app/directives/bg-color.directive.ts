import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

@Directive({
  selector: '[appBgColor]'
})
export class BgColorDirective implements OnInit, OnChanges {

  defaultColor = "pink";
  @Input() appBgColor;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.defaultColor = this.appBgColor ? this.appBgColor : this.defaultColor;
  }

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.defaultColor;
  }

}
