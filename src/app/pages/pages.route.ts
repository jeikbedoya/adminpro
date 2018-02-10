import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginguardGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginguardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress bar'}  },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}  },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}  },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}  },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes'}  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
