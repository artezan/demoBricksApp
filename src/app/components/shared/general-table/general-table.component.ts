import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralTableComponent implements OnInit {
  @Input() rows = [];
  @Input() columns = [{ name: '' }];
  loadingIndicator = false;
  dataTemp = [];
  rows2;
  constructor() {}
  change(event: { value: string; name: string }) {
    this.dataTemp = this.rows;

    const val = event.value;
    const colName = event.name.toLowerCase();
    // filter our data
    if (val && val.trim() !== '') {
      this.rows = this.dataTemp.filter(d => {
        return d[colName].toLowerCase().indexOf(val) !== -1 || !val;
      });
    } else {
      this.rows = this.rows2;
    }
  }
  ngOnInit() {
    this.rows2 = this.rows;
  }
}
