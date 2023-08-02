import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  template: ` <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle naviOnBtnClickedgation"
      (click)="showMenuHandler(show)"
    >
      <span class="navbar-toggler-icon"></span>
    </button>`,
  styleUrls: ['../header/header.component.css'],
})
export class MenuButtonComponent {
  show: boolean = true;
  @Output() showMenuEvent = new EventEmitter<boolean>();
  showMenuHandler(value: boolean) {
    this.show = !this.show;
    this.showMenuEvent.emit(value);
  }
}
