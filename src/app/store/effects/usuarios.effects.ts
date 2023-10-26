import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';

import { map, mergeMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

import { of, catchError } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  private actions$: Actions = inject(Actions);
  private usuarioService = inject(UsuarioService);

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      mergeMap(() =>
        this.usuarioService.getUsers().pipe(
          map((usuarios) =>
            usuariosActions.cargarUsuariosSuccess({ usuarios })
          ),
          catchError((err) =>
            of(usuariosActions.cargarUsuariosError({ payload: err }))
          )
        )
      )
    )
  );
}
