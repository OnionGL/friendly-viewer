import { Component } from '@angular/core';
import { FooterService } from '../services/footer/footer.service';
import { HeaderService } from '../services/header/header.service';
import { AlertService } from '../services/alert/alertService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public footerService: FooterService , public headerService: HeaderService , public alertService: AlertService) {}
}
