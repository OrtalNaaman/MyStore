import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="main-footer">
      <div class="container main-footer-container">
        <ul class="nav footer-nav">
          <li>
            <a href="https://www.instagram.com/" target="_blank">
              <img alt="InstagramLogo" src="assets/Images/InstagramLogo.png" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com" target="_blank">
              <img alt="FacebookLogo" src="assets/Images/FacebookLogo.png" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com" target="_blank">
              <img alt="YoutubeLogo" src="assets/Images/YoutubeLogo.png" />
            </a>
          </li>
        </ul>
        <a class="navbar-brand">
          <img class="favicon" src="../assets/Images/favicon.png" />UCG
        </a>
        <div class="allRights">Ortal Naaman ©2023</div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.css', '../header/header.component.css'],
})
export class FooterComponent {}
