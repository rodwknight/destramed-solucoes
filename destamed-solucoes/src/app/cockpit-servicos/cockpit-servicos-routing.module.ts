import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CockpitServicosPage } from './cockpit-servicos.page';

const routes: Routes = [
  {
    path: '',
    component: CockpitServicosPage,
    children: [
      {
        path: 'contrato',
        redirectTo: '/propostas-contratos/contrato',
      },
      {
        path: 'ordem',
        loadChildren: () => import('../ordem/ordem.module').then((m) => m.OrdemPageModule),
      },
      {
        path: 'proposta',
        loadChildren: () =>
          import('../propostas-contratos/proposta/proposta.module').then((m) => m.PropostaPageModule),
      },
      {
        path: 'propostas-contratos',
        loadChildren: () =>
          import('../propostas-contratos/propostas-contratos.module').then(
            (m) => m.PropostasContratosPageModule,
          ),
      },
      {
        path: 'servico',
        redirectTo: '/servico',
      },
      {
        path: 'unidade',
        loadChildren: () => import('../unidade/unidade.module').then((m) => m.UnidadePageModule),
      },
      {
        path: 'usuario',
        loadChildren: () => import('../usuario/usuario.module').then((m) => m.UsuarioPageModule),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CockpitServicosPageRoutingModule {}
