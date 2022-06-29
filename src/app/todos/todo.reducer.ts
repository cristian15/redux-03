import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, limpiarCompletados, toggle, toggleAll } from './todo.actions';

export const initialState: Todo[]  = [
  new Todo('HOla'),
  new Todo('Chao'),
  new Todo('Buenos Dias'),
  new Todo('Buenas Tardes'),
];

export const todoReducer = createReducer(
  initialState,
  on(crear, (state, {texto}) => [...state, new Todo( texto)] ),
  on(borrar, (state, {id}) => state.filter(todo=> todo.id !== id) ),
  on(limpiarCompletados, (state) => state.filter(todo=> !todo.completado) ),

  on(toggle, (state, {id}) => {

    return state.map( todo =>{
      if(todo.id === id){
        return {
          ... todo,
          completado: !todo.completado
        }
      }
      return todo;
    });
  }),

  on(editar, (state, {id, texto}) => {

    return state.map( todo =>{
      if(todo.id === id){
        return {
          ... todo,
          texto: texto
        }
      }
      return todo;
    });
  }),
  
  on(toggleAll, (state, { completado}) => {

    return state.map( todo =>{
       return {
          ... todo,
          completado: completado
        }
    });
  }),
  

);