import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card";
import { ProfileService } from '../../data/services/profile';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileFilters } from "./profile-filters/profile-filters";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFilters,  AsyncPipe],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPageComponent {
  profileService = inject( ProfileService) 
  profiles = this.profileService.filteredProfiles    

  constructor() {
  }
}
