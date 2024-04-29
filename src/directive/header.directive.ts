import { Directive, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { HeaderService } from '../services/header/header.service';

@Directive({
  selector: '[headerContent]'
})

export class HeaderDirective implements OnInit, OnDestroy {

  constructor(private el: TemplateRef<any>, private headerService: HeaderService) {
    headerService.setTemplateRef(el)
  }

  public ngOnInit() {
    this.headerService.setTemplateRef(this.el)
  }

  public ngOnDestroy() {
    this.headerService.clearTemplateRef()
  }

}
