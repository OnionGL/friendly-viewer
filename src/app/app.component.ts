import { Component } from '@angular/core';
import { FooterService } from '../services/footer/FooterService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public footerService: FooterService) {}
}
