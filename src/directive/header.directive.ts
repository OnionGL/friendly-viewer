import { Directive, TemplateRef } from '@angular/core';
import { HeaderService } from '../services/header/header.service';

@Directive({
  selector: '[headerContent]'
})
export class HeaderDirective {
  constructor(private el: TemplateRef<any>, private headerService: HeaderService) {
    headerService.setTemplateRef(el)
  }

  ngOnInit(){
    this.headerService.setTemplateRef(this.el)
  }

  ngOnDestroy(){
    this.headerService.clearTemplateRef()
  }
}
