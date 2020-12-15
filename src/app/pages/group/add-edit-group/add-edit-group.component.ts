import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss']
})
export class AddEditGroupComponent implements OnInit {
  title = 'Add New';
  btnName = 'Submit';
  constructor(private fb: FormBuilder, 	private activatedRoute: ActivatedRoute, private router: Router,) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			groupname: [null, [Validators.required]],
			groupaddress: [null, [Validators.required]],      
    });
    
    this.activatedRoute.params.subscribe((params) => {
      if(params.id){
      this.title = 'Edit';
      this.btnName = 'Update';
      this.validateForm.patchValue({
        centername: 'John Brown',
        centeraddress: 'New York No. 1 Lake Park'
        
      });
    }
  })

  }
  
  submitGroupForm(form: FormGroup): void {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
	}

	resetForm(e: MouseEvent): void {
		e.preventDefault();
		this.validateForm.reset();
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsPristine();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
	}

}

