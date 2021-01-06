import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { HttpClientModule } from '@angular/common/http';

// #region third libs

const THIRDMODULES = [];

// #endregion

// #region your componets & directives

const COMPONENTS = [];
const DIRECTIVES = [];

// #endregion

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		...SHARED_ZORRO_MODULES,
		// third libs
		...THIRDMODULES,
	],
	declarations: [
		// your components
		...COMPONENTS,
		...DIRECTIVES,
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		...SHARED_ZORRO_MODULES,
		// third libs
		...THIRDMODULES,
		// your components
		...COMPONENTS,
		...DIRECTIVES,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
