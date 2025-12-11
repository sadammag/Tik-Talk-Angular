import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss'
})


export class ProfileHeader {
 profile = input<Profile>() 
                                 
}


//profile здесь — signal, а не сам объект.
//Signal — это функция-обёртка над значением:
//    rofile() → вернуть текущее значение (Profile).
//    profile.set(newValue) → поменять значение 
//      (но для input-сигналов так делать нельзя, потому что это "read-only input").
//    Angular сам вызывает .set(...), когда родитель передаёт значение в [profile].

//     profile()  - получить текущие значение profile