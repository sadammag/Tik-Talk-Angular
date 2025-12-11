import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class Dnd {

  
  @Output() fileDropped = new EventEmitter<File>
  
  
  @HostBinding('class.filover') 
  filover = false



  @HostListener('dragover',['$event'])
  onDragOver(event:DragEvent) {
    event.stopPropagation()
    event.preventDefault()

    this.filover = true
  }

  @HostListener('dragleave',['$event'])
  onDragLeave(event:DragEvent) {
    event.stopPropagation()
    event.preventDefault()

    this.filover = false
  }


  @HostListener('drop',['$event'])
  onDrap(event:DragEvent) {
    event.stopPropagation()
    event.preventDefault()

    this.filover = false

    this.fileDropped.emit(event.dataTransfer?.files[0])

  }
}
