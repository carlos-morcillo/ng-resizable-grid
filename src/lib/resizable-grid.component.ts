import {
	AfterViewInit,
	Component,
	ContentChildren,
	ElementRef,
	HostBinding,
	Input,
	OnInit,
	QueryList
} from '@angular/core';
import { scan, tap } from 'rxjs';
import { ResizerHandlerComponent } from './resizer-handler/resizer-handler.component';
import { SlotComponent } from './slot/slot.component';

@Component({
	selector: 'lib-resizable-grid',
	templateUrl: `./resizable-grid.component.html`,
	styleUrls: [`./resizable-grid.component.scss`]
})
export class ResizableGridComponent implements OnInit, AfterViewInit {
	@ContentChildren(SlotComponent) components: QueryList<SlotComponent>;
	@ContentChildren(ResizerHandlerComponent)
	handlers: QueryList<ResizerHandlerComponent>;

	@Input() size: number = 12;
	@Input() cols: number = 12;
	@Input() rows: number = 12;
	@HostBinding('attr.data-direction') @Input() direction:
		| 'horizontal'
		| 'vertical' = 'horizontal';

	constructor(public elementRef: ElementRef) {}

	ngOnInit(): void {
		// this.components.changes.subscribe((changes) => {
		// 	console.log('Cambios en los componentes', changes);
		// });
	}

	ngAfterViewInit() {
		this.components.map((o) => {
			//console.log(o);
		});
		//console.log(this.components);
		this.handlers.forEach((o, k) => {
			const prevSlot = this.components.get(k);
			const nextSlot = this.components.get(k + 1);
			o.drag$
				.pipe(
					scan(
						(acc, value) => {
							if (value.type === 'mousedown') {
								console.log(k);
								return {
									initial: {
										...value,
										prev: prevSlot.elementRef.nativeElement.getBoundingClientRect(),
										next: nextSlot.elementRef.nativeElement.getBoundingClientRect()
									},
									final: value
								};
							} else {
								return {
									initial: acc.initial,
									final: value
								};
							}
						},
						{ initial: null, final: null }
					),
					tap((o) => {
						// console.table(o);
					})
				)
				.subscribe(({ initial, final }) => {
					const dx = final.x - (initial.x ?? 0);
					const dy = final.y - (initial.y ?? 0);

					const totalSize = prevSlot.size + nextSlot.size;

					if (this.direction === 'horizontal') {
						const wp = initial.prev.width + dx;
						const sp = Math.round(
							(wp * this.size) /
								this.elementRef.nativeElement.getBoundingClientRect().width
						);
						prevSlot.size = sp;
						nextSlot.size = totalSize - sp;

						console.log(`wp > ${wp} | sp > ${sp} sn > ${totalSize - sp}`);
					} else {
						// const totalHeight = initial.prev.height + initial.next.height;
						// const totalWidth = initial.prev.width + initial.next.width;

						const hp = initial.prev.height + dy;
						// prevSlot.elementRef.nativeElement.style.height = `${hp}px`;
						const sp = Math.round(
							(hp * this.rows) /
								this.elementRef.nativeElement.getBoundingClientRect().height
						);
						prevSlot.size = sp;

						// const hn = totalHeight - hp;
						// nextSlot.elementRef.nativeElement.style.height = `${hn}px`;
						nextSlot.size = totalSize - sp;

						console.log(`hp > ${hp} | sp > ${sp} sn > ${totalSize - sp}`);
					}
				});
			// 	combineLatest({
			// 		initial: o.mouseDown$.pipe(
			// 			map(({ x, y }) => {
			// 				const { width, height } = this.components
			// 					.get(k)
			// 					.elementRef.nativeElement.getBoundingClientRect();
			// 				return {
			// 					x,
			// 					y,
			// 					prev: {
			// 						width,
			// 						height
			// 					}
			// 				};
			// 			}),
			// 			tap((o) => console.log('initial', o))
			// 		),
			// 		final: o.mouseMove$.pipe(tap((o) => console.log(o)))
			// 	}).subscribe((value) => {
			// 		console.log('combine');
			// 		// this.resizeSlots(
			// 		// 	value.initial,
			// 		// 	value.final,
			// 		// 	o,
			// 		// 	this.components.get(k),
			// 		// 	this.components.get(k + 1)
			// 		// );
			// 		// console.log(value);
			// 	});
			// 	// o.resizable$.subscribe((event) => {
			// 	// 	// console.log('event', event);
			// 	// 	// console.log('prev', this.components.get(k - 1));
			// 	// 	// console.log('next', this.components.get(k));
			// 	// 	this.resizeSlots(
			// 	// 		event.mousedown,
			// 	// 		event.mousemove,
			// 	// 		o,
			// 	// 		this.components.get(k),
			// 	// 		this.components.get(k + 1)
			// 	// 	);
			// 	// });
		});
	}

	// resizeSlots(
	// 	initial: { x: number; y: number; prev: { width: number; height: number } },
	// 	move: { x: number; y: number },
	// 	resizer: ResizerHandlerComponent,
	// 	prev: SlotComponent,
	// 	next: SlotComponent
	// ) {
	// 	const { height: prevHeight, width: prevWidth } =
	// 		prev.elementRef.nativeElement.getBoundingClientRect();
	// 	// const { height: nextHeight, width: nextWidth } =
	// 	// 	next.elementRef.nativeElement.getBoundingClientRect();
	// 	const { height: contentHeight, width: contentWidth } =
	// 		this.elementRef.nativeElement.getBoundingClientRect();
	// 	const totalHeight =
	// 		prev.elementRef.nativeElement.getBoundingClientRect().height +
	// 		next.elementRef.nativeElement.getBoundingClientRect().height;
	// 	const dx = move.x - (initial.x ?? 0);
	// 	const dy = move.y - (initial.y ?? 0);
	// 	console.log(`dx > ${dx} | dy > ${dy}`);
	// 	switch (resizer.direction) {
	// 		case 'vertical':
	// 			console.log(
	// 				`totalHeight ${totalHeight}%, contentHeight ${contentHeight}%`
	// 			);
	// 			// const totalHeightPercentage = (totalHeight * 100) / contentHeight;
	// 			// const hp = ((prevHeight + dy) * totalHeightPercentage) / totalHeight;
	// 			const hp = initial.prev.height + dx;
	// 			prev.elementRef.nativeElement.style.height = `${hp}px`;

	// 			const hn = totalHeight - hp;
	// 			next.elementRef.nativeElement.style.height = `${hn}px`;
	// 			console.log(
	// 				`Vertical prev ${hp}px, next ${hn}px, total ${totalHeight}`
	// 			);
	// 			break;
	// 		case 'horizontal':
	// 		default:
	// 			// const totalWidthPercentage =
	// 			// 	(this.totalWidth * 100) / this.parent.getBoundingClientRect().width;
	// 			// const wp =
	// 			// 	((this.prevSiblingWidth + dx) * totalWidthPercentage) /
	// 			// 	this.totalWidth;
	// 			// this.prevSibling.style.width = `${wp}%`;

	// 			// const wn = totalWidthPercentage - wp;
	// 			// this.prevSibling.style.width = `${wn}%`;
	// 			// console.log(`Horizontal prev ${wp}%, next ${wn}%`);
	// 			break;
	// 	}

	// 	const cursor =
	// 		resizer.direction === 'horizontal' ? 'col-resize' : 'row-resize';
	// 	resizer.elementRef.nativeElement.style.cursor = cursor;
	// 	document.body.style.cursor = cursor;

	// 	prev.elementRef.nativeElement.style.userSelect = 'none';
	// 	prev.elementRef.nativeElement.style.pointerEvents = 'none';

	// 	next.elementRef.nativeElement.style.userSelect = 'none';
	// 	next.elementRef.nativeElement.style.pointerEvents = 'none';
	// 	}
}
