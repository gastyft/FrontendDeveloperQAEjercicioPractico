import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { PrincipalComponent } from "./components/principal/principal.component";
import { Error404Component } from './components/error404/error404.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, PrincipalComponent]
})
export class AppComponent {
  title = 'FrontendDeveloperQA';
}
