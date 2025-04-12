import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextTransform]'
})
export class ButtonActiveDirective {
  private static lastClickedElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    if (ButtonActiveDirective.lastClickedElement) {
      this.renderer.removeStyle(ButtonActiveDirective.lastClickedElement, 'background-color');
    }
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#673ab7');
    ButtonActiveDirective.lastClickedElement = this.el.nativeElement;
  }
}
