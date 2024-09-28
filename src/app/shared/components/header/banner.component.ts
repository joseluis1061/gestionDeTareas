import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule,  RouterLink, RouterLinkActive ],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent  {
  @Input() showSearch: boolean = true;
  @Input() title: string = "Gestion de tareas";
  faBars = faBars;

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
