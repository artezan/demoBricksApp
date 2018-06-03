import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralTableComponent implements OnInit, OnChanges {
  @Input() rows = [];
  @Input() columns = [{ name: '' }];
  @Input() loadingIndicator: boolean;
  dataTemp = [];
  rows2;
  constructor() {}
  change(event: { value: string; name: string }) {
    this.dataTemp = this.rows;
    const val = event.value;
    const colName = event.name;
    // filter our data
    if (val && val.trim() !== '') {
      this.rows = this.dataTemp.filter(d => {
        if (d[colName] !== '') {
          return d[colName].toString().toLowerCase().indexOf(val) !== -1 || !val;
        }
      });
    } else {
      this.rows = this.rows2;
    }
  }
  ngOnInit() {
    this.rows2 = this.rows;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.rows.currentValue) {
      this.rows = [...changes.rows.currentValue];
      this.rows2 = this.rows;
    }
  }
}
