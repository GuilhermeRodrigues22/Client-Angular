import { Client } from './../client';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnChanges {
  @Input()
  client: Client = {} as Client;

  @Output()
  saveEvent = new EventEmitter<Client>();

  @Output()
  cleanEvent = new EventEmitter

  formGroupClient: FormGroup;



  constructor(private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupClient.setValue(this.client);
  }

  save() {
    if(this.formGroupClient.valid){
      this.saveEvent.emit(this.formGroupClient.value);
      this.formGroupClient.reset();
    }
  }

  FormReset() {
    this.cleanEvent.emit();
    this.formGroupClient.reset();
  }
}
