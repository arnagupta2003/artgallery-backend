import { Component, Input, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { CustomColumnComponent } from '@vendure/admin-ui/core';

@Component({
  selector: 'empty-column',
  template: ``,
  standalone: true,
})
export class EmptyColumnComponent implements CustomColumnComponent, AfterViewInit {
  @Input() rowItem: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Find the parent cell and hide it
    const cell = this.el.nativeElement.closest('td');
    if (cell) {
      this.renderer.setStyle(cell, 'display', 'none');
    }

    // Find the column index and hide the header cell
    const row = cell?.parentElement;
    if (row && row.children) {
      const index = Array.from(row.children).indexOf(cell);
      const headerRow = document.querySelector('thead tr');
      const headerCell = headerRow?.children?.[index];
      if (headerCell) {
        this.renderer.setStyle(headerCell, 'display', 'none');
      }
    }
  }
}
