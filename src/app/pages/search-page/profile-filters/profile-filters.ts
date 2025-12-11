import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile';
import { debounceTime, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss'
})

export class ProfileFilters {

  fb = inject(FormBuilder);
  profilService = inject(ProfileService)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    staсk: ['']
  })



  constructor(){
    this.searchForm.valueChanges
    .pipe(
      startWith({}),
      debounceTime(300),
      switchMap(formValue => {
        return this.profilService.filterProfiles(formValue)
      })
    )
    .subscribe()  ///
  }


}

