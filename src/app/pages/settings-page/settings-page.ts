import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first, firstValueFrom, retry } from 'rxjs';
import { ProfileService } from '../../data/services/profile';
import { AvatarUpload } from "./avatar-upload/avatar-upload";

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule, AvatarUpload],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})

export class SettingsPage {

  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  //вьючайлд ?
  @ViewChild(AvatarUpload) avatarUploader!: AvatarUpload


form = this.fb.group({
    firstName:['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value:'', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
})

  ngAfterViewInit(){
    this.avatarUploader.avatar
  }


  constructor(){
    effect(() => {    
      console.log(this.profileService.me()) 
       //@ts-ignore                                 //effect -запускает колбэк когда любо сигнал внутри этой фун поменяется
       this.form.patchValue( {
        ...this.profileService.me(),
                                                              //@ts-ignore    //effect -запускает колбэк когда любо сигнал внутри этой фун поменяется
        stack: this.mergeStack(this.profileService.me()?.stack)
      },
                  ) //this.profileService.me      //Это сигнал, как ты помнишь
    })
  }

  onSave(){
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if(this.form.invalid) return

    if(this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.upLoadAvatar(this.avatarUploader.avatar))
    }

       //@ts-ignore  
    firstValueFrom(this.profileService.patchProfile( {
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)

    }))

  }


  splitStack(stack: string | null | string[]  | undefined) {
      if(!stack) return []
      if(Array.isArray(stack)) return stack

      return stack.split(',')
  }


  mergeStack(stack: string | null | string[] | undefined) {
      if(!stack) return []
      if(Array.isArray(stack)) return stack.join(',')

      return stack
  }

  }
