export const mainMenuItems = [
  {
    title: 'Propostas e Contratos',
    icon: 'folder-open',
    route: '/propostas-contratos',
    color: 'secondary',
  },
  { title: 'Unidades', icon: 'business', route: '/unidade', color: 'secondary' },
  { title: 'Ordens', icon: 'file-tray-full', route: '/ordem', color: 'secondary' },
  { title: 'Serviços', icon: 'construct', route: '/servico', color: 'secondary' },
  { title: 'Clientes', icon: 'people', route: '/cliente', color: 'secondary' },
] as const;
