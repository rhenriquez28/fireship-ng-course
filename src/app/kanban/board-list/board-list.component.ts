import { Component, OnInit, OnDestroy } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Subscription } from "rxjs";
import { Board } from "../board.model";
import { BoardService } from "../board.service";
import { MatDialog } from "@angular/material/dialog";
import { BoardDialogComponent } from "../dialogs/board-dialog.component";

@Component({
	selector: "app-board-list",
	templateUrl: "./board-list.component.html",
	styleUrls: ["./board-list.component.scss"]
})
export class BoardListComponent implements OnInit, OnDestroy {
	boards: Board[];
	sub: Subscription;

	constructor(public boardSevice: BoardService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.sub = this.boardSevice
			.getUserBoards()
			.subscribe(boards => (this.boards = boards));
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
		this.boardSevice.sortBoards(this.boards);
	}

	openBoardDialog(): void {
		const dialogRef = this.dialog.open(BoardDialogComponent, {
			width: "400px",
			data: {}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.boardSevice.createBoard({
					title: result,
					priority: this.boards.length
				});
			}
		});
	}
}
