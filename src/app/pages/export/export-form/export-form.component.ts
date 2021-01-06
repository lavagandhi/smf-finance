import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';

@Component({
  selector: 'app-export-form',
  templateUrl: './export-form.component.html',
  styleUrls: ['./export-form.component.scss']
})
export class ExportFormComponent implements OnInit {
  title = 'Export';
  listOfData:Array<any> = [];
  constructor(private fb: FormBuilder,) { }
  validateForm: FormGroup;

  ngOnInit() {
  }


}
