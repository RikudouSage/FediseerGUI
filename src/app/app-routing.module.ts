import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'instances',
    loadChildren: () => import('./instances/instances.module').then(m => m.InstancesModule),
  },
  {
    path: 'endorsements',
    loadChildren: () => import('./endorsements/endorsements.module').then(m => m.EndorsementsModule),
  },
  {
    path: 'guarantees',
    loadChildren: () => import('./guarantees/guarantees.module').then(m => m.GuaranteesModule),
  },
  {
    path: 'censures',
    loadChildren: () => import('./censures/censures.module').then(m => m.CensuresModule),
  },
  {
    path: 'glossary',
    loadChildren: () => import('./glossary/glossary.module').then(m => m.GlossaryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
