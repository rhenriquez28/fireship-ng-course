import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
	selector: "app-board-dialog",
	template: `
		<h1 mat-dialog-title>Board</h1>
		<div mat-dialog-content>
			<p>What shall we name this board?</p>
			<mat-form-field>
				<input placeholder="Title" matInput [(ngModel)]="data.title" />
			</mat-form-field>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="onNoClick()">Cancel</button>
			<button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>
				Create
			</button>
		</div>
	`
})
export class BoardDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<BoardDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}
	onNoClick() {
		this.dialogRef.close();
	}
}
