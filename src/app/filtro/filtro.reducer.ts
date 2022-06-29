import { createReducer, on } from "@ngrx/store";
import { filtrosValidos, setFiltro } from "./filtro.actions";

export const initialState:filtrosValidos = 'todos' as filtrosValidos;

export const _filtroReducer = createReducer(
    initialState,
    on(setFiltro, (state: filtrosValidos, {filtro}) =>  filtro )  
);


