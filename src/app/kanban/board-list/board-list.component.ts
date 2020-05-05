import { Component, OnInit, OnDestroy } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Subscription } from "rxjs";
import { Board } from "../board.model";
import { BoardService } from "../board.service";

@Component({
	selector: "app-board-list",
	templateUrl: "./board-list.component.html",
	styleUrls: ["./board-list.component.scss"]
})
export class BoardListComponent implements OnInit, OnDestroy {
	boards: Board[];
	sub: Subscription;

	constructor(public boardSevice: BoardService) {}

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
}
