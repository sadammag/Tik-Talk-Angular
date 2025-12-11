import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card';

@Component({
  selector: 'app-root',
  standalone: true, ///
  imports: [RouterOutlet, ProfileCardComponent],

  templateUrl: './app.html', 
  styleUrl: './app.scss'     
})

export class App {

}




