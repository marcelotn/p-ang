import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard-v1',
    name: 'DASHBOARD',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'asset',
    name: 'Ativos',
    type: 'sub',
    icon: 'insert_comment',
    children: [
      {state: 'registration', name: 'Cadastro'},
      {state: 'list', name: 'Lista'}
    ]
  },
  // {
  //   state: 'institution',
  //   name: 'Instituições',
  //   type: 'sub',
  //   icon: 'insert_comment',
  //   children: [
  //     {state: 'registration', name: 'Cadastro'},
  //     {state: 'list', name: 'Lista'}
  //   ]
  // },
  // {
  //   state: 'indexer',
  //   name: 'Indexadores',
  //   type: 'sub',
  //   icon: 'insert_comment',
  //   children: [
  //     {state: 'registration', name: 'Cadastro'},
  //     {state: 'list', name: 'Lista'}
  //   ]
  // }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
