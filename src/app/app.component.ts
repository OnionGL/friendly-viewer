import { Component } from '@angular/core';
import { FooterService } from '../services/footer/FooterService.service';
import { HeaderService } from '../services/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public footerService: FooterService , public headerService: HeaderService) {}
}
