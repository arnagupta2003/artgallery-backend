import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebContentComponent } from './components/web-content/web-content.component';

@NgModule({
    imports: [CommonModule], // Ensures *ngIf, *ngFor, etc., are available
    declarations: [WebContentComponent],
    exports: [WebContentComponent],
})
export class WebContentUiModule {}
