import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page';
import { SearchPageComponent } from './pages/search-page/search-page';
import { ProfilePageCopmonent } from './pages/profile-page/profile-page';
import { LayoutComponent } from './common-ui/layout/layout';
import { canActivateAuth } from './auth/acces.guard';
import { SettingsPage } from './pages/settings-page/settings-page';

export const routes: Routes = [

    {
        path: '', component: LayoutComponent, children :[
            {path: '', redirectTo:'profile/me', pathMatch: 'full'}, 
            {path: 'profile/:id', component: ProfilePageCopmonent},
            {path: 'settings', component: SettingsPage},
            {path: 'search', component: SearchPageComponent},             
        ],

      canActivate: [canActivateAuth]

    },

    {path: 'login', component: LoginPageComponent}
];
