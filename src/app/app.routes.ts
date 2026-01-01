import { Routes } from '@angular/router';
import { Form } from './form/form';

export const routes: Routes = [
    {
        path: 'form', component: Form 

    },
    {
        path:'',
        redirectTo:'form',
        pathMatch:'full'
    }
];
