import { ClientService } from './../client.service';
import { Client } from './../client';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  formGroupClient: FormGroup;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ClientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
    });
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getClientById(id);
  }
  getClientById(id: number) {
    this.ClientService.getClient(id).subscribe({
      next: (data) => {
        this.formGroupClient.setValue(data);
        this.isEditing = true;
      },
    });
  }

  save() {
    if (this.formGroupClient.valid) {
      if (this.isEditing) {
        this.ClientService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          },
        });
      } else {
        this.ClientService.save(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          },
        });
      }
    }
  }

  FormReset() {
    this.formGroupClient.reset();
  }

  cancel() {
    this.router.navigate(['clients']);
  }
}
