import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/error/404-page/404.component';
import { ErrorPageComponent } from './shared/error/500-page/500.component';

export const AppRoute: Routes = [
        
    {
        path: 'error',
        component: ErrorPageComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(AppRoute);
