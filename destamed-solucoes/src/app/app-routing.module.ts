import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'ordem',
    loadChildren: () => import('./ordem/ordem.module').then((m) => m.OrdemPageModule),
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then((m) => m.UsuarioPageModule),
  },
  {
    path: 'servico',
    loadChildren: () => import('./servico/servico.module').then((m) => m.ServicoPageModule),
  },
  {
    path: 'unidade',
    loadChildren: () => import('./unidade/unidade.module').then((m) => m.UnidadePageModule),
  },
  {
    path: 'propostas-contratos',
    loadChildren: () =>
      import('./propostas-contratos/propostas-contratos.module').then(
        (m) => m.PropostasContratosPageModule,
      ),
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then((m) => m.ClientePageModule),
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./configuracao/configuracao.module').then((m) => m.ConfiguracaoPageModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
