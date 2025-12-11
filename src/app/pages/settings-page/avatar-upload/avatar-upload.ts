import { Component, signal, ɵunwrapWritableSignal } from '@angular/core';
import { Dnd } from "../../../common-ui/directives/dnd";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  imports: [Dnd, FormsModule],
  standalone: true,
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss'
})
export class AvatarUpload {
  preview = signal<string>('/assets/img/avatar-placeholder')

  avatar:File | null = null 

  fileBrowserHandler(event: Event) {
   const file = (event.target as HTMLInputElement)?.files?.[0];   ///
   this.processFile(file)
  }
  
  onFileDroped(file: File) {
  this.processFile(file);
  }


  processFile(file:File | null | undefined) {
       if (!file || !file.type.match('image')) return

      const reader = new FileReader()   // reader - умеет читать выбранный файл 

      reader.onload = event => {      //Когда
        this.preview.set(event.target?.result?.toString() ?? '')
      }  
                    // onload - события когда файл будет загружен браузером 
      reader.readAsDataURL(file)    // запуск процесса чтения файла закодированного
      this.avatar = file
  }


}
