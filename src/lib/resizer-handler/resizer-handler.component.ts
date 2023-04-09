import { DOCUMENT } from '@angular/common';
import {
	Component,
	ElementRef,
	HostBinding,
	Inject,
	Input,
	OnInit,
	Output
} from '@angular/core';
import {
	Observable,
	fromEvent,
	map,
	startWith,
	switchMap,
	takeUntil
} from 'rxjs';
import { ResizableGridComponent } from '../resizable-grid.component';

@Component({
	selector: 'resizer-handler',
	templateUrl: './resizer-handler.component.html',
	styleUrls: ['./resizer-handler.component.css']
})
export class ResizerHandlerComponent implements OnInit {
	@HostBinding('class') get direction() {
		return this._parent.direction;
	}

	parent: HTMLElement;
	prevSibling: HTMLElement;
	nextSibling: HTMLElement;

	// The current position of mouse
	x = 0;
	y = 0;
	prevSiblingHeight = 0;
	prevSiblingWidth = 0;

	nextSiblingHeight = 0;
	nextSiblingWidth = 0;

	totalHeight = 0;
	totalWidth = 0;

	hostListenerEnabled = false;
	// @Output()
	// readonly mouseDown$ = fromEvent<MouseEvent>(
	// 	this.elementRef.nativeElement,
	// 	'mousedown'
	// ).pipe(
	// 	tap((e) => e.preventDefault()),
	// 	map(({ clientX: x, clientY: y }) => ({ x, y }))
	// );

	// @Output()
	// readonly mouseMove$ = fromEvent<MouseEvent>(
	// 	this.documentRef,
	// 	'mousemove'
	// ).pipe(
	// 	tap((e) => e.preventDefault()),
	// 	map(({ clientX: x, clientY: y }) => ({ x, y })),
	// 	distinctUntilChanged(),
	// 	takeUntil(fromEvent(this.documentRef, 'mouseup'))
	// );

	@Output()
	readonly drag$: Observable<{ x: number; y: number; type: string }> =
		fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown').pipe(
			switchMap((downEvent) =>
				fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
					map((moveEvent) => ({
						x: moveEvent.clientX,
						y: moveEvent.clientY,
						type: 'mousemove'
					})),
					startWith({
						x: downEvent.clientX,
						y: downEvent.clientY,
						type: 'mousedown'
					}),
					takeUntil(fromEvent(this.documentRef, 'mouseup'))
				)
			)
			// tap((e) => e.preventDefault()),
			// switchMap((event: MouseEvent) => {
			// 	// const { width, right } = this.elementRef.nativeElement
			// 	// 	.closest('th')!
			// 	// 	.getBoundingClientRect();
			// 	return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
			// 		//map(({ clientX }) => width + clientX - right),
			// 		map(({ clientX, clientY }) => ({
			// 			mousedown: { x: event.clientX, y: event.clientY },
			// 			mousemove: { x: clientX, y: clientY }
			// 		})),
			// 		filter((value) => {
			// 			return (
			// 				value.mousedown.x !== value.mousemove.x ||
			// 				value.mousedown.y !== value.mousemove.y
			// 			);
			// 		}),
			// 		// debounceTime(2000),
			// 		distinctUntilChanged(),
			// 		takeUntil(fromEvent(this.documentRef, 'mouseup'))
			// 	);
			// })
		);

	constructor(
		private _parent: ResizableGridComponent,
		@Inject(DOCUMENT) private readonly documentRef: any /* Document */,
		@Inject(ElementRef) readonly elementRef: ElementRef<HTMLElement>
	) {}

	ngOnInit(): void {
		// 		this.parent = this.elementRef.nativeElement.parentNode as HTMLElement;
		// 		this.prevSibling = this.elementRef.nativeElement
		// 			.previousElementSibling as HTMLElement;
		// 		this.nextSibling = this.elementRef.nativeElement
		// 			.nextElementSibling as HTMLElement;
		// /* 		console.log('prev', this.prevSibling);
		// 		console.log('next', this.nextSibling); */
	}

	// 	// Handle the mousedown event
	// 	// that's triggered when user drags the resizer
	// 	@HostListener('mousedown', ['$event'])
	// 	mouseDownHandler(event) {
	// 		console.log('mouseDown');
	// 		// Get the current mouse position
	// 		this.x = event.clientX;
	// 		this.y = event.clientY;
	// 		const rect = this.prevSibling.getBoundingClientRect();
	// 		this.prevSiblingHeight = rect.height;
	// 		this.prevSiblingWidth = rect.width;
	// 		console.log(
	// 			'prevSibling',
	// 			'w',
	// 			this.prevSiblingWidth,
	// 			'h',
	// 			this.prevSiblingHeight
	// 		);

	// 		const nextRect = this.nextSibling.getBoundingClientRect();
	// 		this.nextSiblingHeight = nextRect.height;
	// 		this.nextSiblingWidth = nextRect.width;
	// 		console.log('nextSibling', 'w', nextRect.width, 'h', nextRect.height);

	// 		this.totalHeight = this.prevSiblingHeight + this.nextSiblingHeight;
	// 		this.totalWidth = this.prevSiblingWidth + this.nextSiblingWidth;

	// 		// Attach the listeners to `document`
	// 		this.enableListener();
	// 		document.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
	// 		document.addEventListener('mouseup', this.mouseUpHandler.bind(this));
	// 	}

	// 	mouseMoveHandler(event) {
	// 		if (this.hostListenerEnabled) {
	// 			console.log('mouseMoveHandler');
	// 			// How far the mouse has been moved
	// 			const dx = event.clientX - (this.x ?? 0);
	// 			const dy = event.clientY - (this.y ?? 0);
	// 			console.log(`dx > ${dx} | dy > ${dy}`);

	// 			switch (this.direction) {
	// 				case 'vertical':
	// 					const totalHeightPercentage =
	// 						(this.totalHeight * 100) /
	// 						this.parent.getBoundingClientRect().height;
	// 					const hp =
	// 						((this.prevSiblingHeight + dy) * totalHeightPercentage) /
	// 						this.totalHeight;
	// 					this.prevSibling.style.height = `${hp}%`;

	// 					const hn = totalHeightPercentage - hp;
	// 					this.nextSibling.style.height = `${hn}%`;
	// 					console.log(`Vertical prev ${hp}%, next ${hn}%`);
	// 					break;
	// 				case 'horizontal':
	// 				default:
	// 					const totalWidthPercentage =
	// 						(this.totalWidth * 100) / this.parent.getBoundingClientRect().width;
	// 					const wp =
	// 						((this.prevSiblingWidth + dx) * totalWidthPercentage) /
	// 						this.totalWidth;
	// 					this.prevSibling.style.width = `${wp}%`;

	// 					const wn = totalWidthPercentage - wp;
	// 					this.prevSibling.style.width = `${wn}%`;
	// 					console.log(`Horizontal prev ${wp}%, next ${wn}%`);
	// 					break;
	// 			}

	// 			const cursor =
	// 				this.direction === 'horizontal' ? 'col-resize' : 'row-resize';
	// 			this.elementRef.nativeElement.style.cursor = cursor;
	// 			document.body.style.cursor = cursor;

	// 			this.prevSibling.style.userSelect = 'none';
	// 			this.prevSibling.style.pointerEvents = 'none';

	// 			this.nextSibling.style.userSelect = 'none';
	// 			this.nextSibling.style.pointerEvents = 'none';
	// 		}
	// 	}

	// 	mouseUpHandler() {
	// 		console.log('mouseUpHandler1');
	// 		if (this.hostListenerEnabled) {
	// 			console.log('mouseUpHandler');
	// 			this.elementRef.nativeElement.style.removeProperty('cursor');
	// 			document.body.style.removeProperty('cursor');

	// 			this.prevSibling.style.removeProperty('user-select');
	// 			this.prevSibling.style.removeProperty('pointer-events');

	// 			this.nextSibling.style.removeProperty('user-select');
	// 			this.nextSibling.style.removeProperty('pointer-events');

	// 			// Remove the handlers of `mousemove` and `mouseup`
	// 			this.disableListener();
	// 			document.removeEventListener('mousemove', this.mouseMoveHandler);
	// 			document.removeEventListener('mouseup', this.mouseUpHandler);
	// 		}
	// 	}

	// 	enableListener() {
	// 		console.log('hostListenerEnabled enabled');
	// 		this.hostListenerEnabled = true;
	// 	}

	// 	disableListener() {
	// 		console.log('hostListenerEnabled disabled');
	// 		this.hostListenerEnabled = false;
	// 	}

	// 	// Attach the handler
	// 	// this.elementRef.nativeElement.addEventListener('mousedown', mouseDownHandler);
}
