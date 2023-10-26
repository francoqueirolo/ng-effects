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
  loading: boolean = false;
  error: any;

  ngOnInit() {
    this.store.select('usuarios').subscribe(({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch(usuariosActions.cargarUsuarios());
  }
}
