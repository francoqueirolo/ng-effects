import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private store: Store<AppState> = inject(Store);
  usuario: Usuario | null = null;

  ngOnInit() {
    this.store.select('usuario').subscribe(({ user }) => {
      this.usuario = user;
    });

    this.router.params.subscribe(({ id }) => {
      this.store.dispatch(cargarUsuario({ id }));
    });
  }
}
