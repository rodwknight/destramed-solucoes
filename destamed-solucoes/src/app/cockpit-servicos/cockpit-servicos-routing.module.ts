import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContratoPage } from './contrato/contrato.page';
import { CockpitServicosPage } from './cockpit-servicos.page';
import { OrdemPage } from './ordem/ordem.page';

const routes: Routes = [
  {
    path: '',
    component: CockpitServicosPage,
    children: [
      {
        path: 'contrato',
        component: ContratoPage,
      },
      {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then((m) => m.EmpresaPageModule),
      },
      {
        path: 'ordem',
        component: OrdemPage,
      },
      {
        path: 'proposta',
        loadChildren: () => import('./proposta/proposta.module').then((m) => m.PropostaPageModule),
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
