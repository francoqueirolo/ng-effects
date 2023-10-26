import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';

import * as usuariosActions from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [],
})
export class ListaComponent implements OnInit {
  private store: Store<AppState> = inject(Store);
  usuarios: Usuario[] = [];

  ngOnInit() {
    this.store.select('usuarios').subscribe(({ users }) => {
      this.usuarios = users;
    });

    this.store.dispatch(usuariosActions.cargarUsuarios());
  }
}
