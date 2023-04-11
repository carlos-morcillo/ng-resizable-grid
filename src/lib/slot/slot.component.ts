import {
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnInit
} from '@angular/core';
import { ResizableGridComponent } from '../resizable-grid.component';

@Component({
	selector: 'slot',
	templateUrl: './slot.component.html',
	styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {
	@Input() size: number = 1;

	constructor(
		private _parent: ResizableGridComponent,
		public elementRef: ElementRef
	) {}

	ngOnInit(): void {}

	@HostBinding('style')
	get style() {
		const { height, width } =
			this._parent.elementRef.nativeElement.getBoundingClientRect();
		console.log(
			this._parent.direction,
			height,
			width,
			this._parent.size,
			this.size
		);
		if (this._parent.direction === 'horizontal') {
			return {
				width: (width / this._parent.size) * this.size + 'px'
			};
		} else {
			return {
				height:
					(this._parent.elementRef.nativeElement.getBoundingClientRect()
						.height /
						this._parent.size) *
						this.size +
					'px'
			};
		}
		return (
			(this._parent.elementRef.nativeElement.offsetHeight / 12) * this.size
		);
	}
}
