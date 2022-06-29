import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.model';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico !: ElementRef;
  todoMutable !: Todo;
  editando: boolean = false;

  chkCompletado: FormControl= new FormControl();
  txtInput: FormControl = new FormControl();
  constructor(private store: Store<AppState>) {    

  }
  
  ngOnInit(): void {
    this.todoMutable = {...this.todo};
    this.txtInput = new FormControl(this.todoMutable.texto, Validators.required);
    this.chkCompletado = new FormControl(this.todoMutable.completado);

    this.chkCompletado.valueChanges.subscribe(valor=>{
      console.log(valor);
      this.store.dispatch(actions.toggle({id: this.todoMutable.id}));
    });

  }

  editar(){
    this.editando = true;
    this.txtInput.setValue(this.todoMutable.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
      
    }, 1);
  }

  terminarEdicion(){
    this.editando = false;

    if(this.txtInput.invalid){return}
    if(this.txtInput.value === this.todoMutable.texto){return}

    this.store.dispatch(actions.editar({
      id: this.todoMutable.id,
      texto: this.txtInput.value
    }));
  }

  borrar(){
    this.store.dispatch(actions.borrar({id: this.todoMutable.id}));
  }

}
