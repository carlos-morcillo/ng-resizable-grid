import { NgModule } from '@angular/core';
import { ResizableGridComponent } from './resizable-grid.component';
import { ResizerHandlerComponent } from './resizer-handler/resizer-handler.component';
import { SlotComponent } from './slot/slot.component';

@NgModule({
	declarations: [
		ResizableGridComponent,
		ResizerHandlerComponent,
		SlotComponent
	],
	imports: [],
	exports: [ResizableGridComponent, ResizerHandlerComponent, SlotComponent]
})
export class ResizableGridModule {}
