import { ActivatedRoute, Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './common/auth.gaurd';
import { AcademicsComponent } from './academics/academics.component';
import { ImagesComponent } from './images/images.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'academics',
    component: AcademicsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'images',
    component: ImagesComponent,
    canActivate: [AuthGuard]
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

export const routes = RouterModule.forRoot(appRoutes);
