import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule)
  },
  // {
  //   path: 'pets/register',
  //   loadChildren: () => import('./pet-register/pet-register.module').then( m => m.PetRegisterPageModule)
  // },
  {
    path: 'pets',
    loadChildren: () => import('./pets/pets.module').then(m => m.PetsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'pet-details',
    loadChildren: () => import('./pet-details/pet-details.module').then( m => m.PetDetailsPageModule)
  },  {
    path: 'aparencia',
    loadChildren: () => import('./aparencia/aparencia.module').then( m => m.AparenciaPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
