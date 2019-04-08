import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryListComponent } from '../component/inventory-list/inventory-list.component';


export const commonRoute: Routes = [
    {
        path: 'applications',
        redirectTo: 'applications/permitinventory',
        pathMatch: 'full'
    },
    {
        path:'applications',
        children:[
            {
                path: ':requestType',
                component: InventoryListComponent,
                data: { title: 'AIR - PERMITS', pageClass: 'list-page' }
            },
            {
                path: 'qb',
                children:[]
            },
            {
                path: 'template',
                children:[]
               
            },
            {
                path: 'cc',
                children:[]
            }

        ]
    }
];

export const commonRouting: ModuleWithProviders = RouterModule.forRoot(commonRoute);

