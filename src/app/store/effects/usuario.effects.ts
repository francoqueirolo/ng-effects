import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';

import { map, mergeMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

import { of, catchError } from 'rxjs';

@Injectable()
export class UsuarioEffects {
  private actions$: Actions = inject(Actions);
  private usuarioService = inject(UsuarioService);

  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap((action) =>
        this.usuarioService.getUserById(action.id).pipe(
          map((user) => usuarioActions.cargarUsuarioSuccess({ usuario: user })),
          catchError((err) =>
            of(usuarioActions.cargarUsuarioError({ payload: err }))
          )
        )
      )
    )
  );
}
