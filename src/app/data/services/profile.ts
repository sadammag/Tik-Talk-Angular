import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pagable } from '../interfaces/pagable.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProfileService {
  
  http = inject(HttpClient) 
  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  me = signal<Profile | null >(null)      
  filteredProfiles = signal<Profile[]>([])   


  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
       .pipe(
          tap((res) => this.me.set(res), ),
        );
  }


  getAccount(id:string ) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
       .pipe(
          tap((res) => this.me.set(res))
        );
  }


  getSubscibersShortList(subsAmaunt = 3) {
    return this.http.get<Pagable<Profile>>(`${this.baseApiUrl}account/subscribers/880343329`)
      .pipe(
        map((res: Pagable<Profile>) => res.items.slice(0,subsAmaunt))
      )
  }

  patchProfile(profile: Partial<Profile>){
    return this.http.patch<Profile[]>(
      `${this.baseApiUrl}account/me`,
      profile
    )
  }


  upLoadAvatar(file:File) {
    const fd = new FormData()
    fd.append('image', file)
    
       return this.http.post<Profile[]>(
      `${this.baseApiUrl}account/upload_image`,
      fd
    )
  }


  filterProfiles(params: Record<string, any>){
    return  this.http.get<Pagable<Profile>>(
      `${this.baseApiUrl}account/accounts`,
      {
        params
      }
    ).pipe(
      tap(res => this.filteredProfiles.set(res.items))
    )
  }
}
