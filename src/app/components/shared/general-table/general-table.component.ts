import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  DoCheck
} from '@angular/core';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralTableComponent implements OnInit, OnChanges {
  @Input() rows = [];
  @Input() columns = [{ name: '', prop: '', width: '' }];
  @Input() loadingIndicator: boolean;
  @Input() checkColum = false;
  //
  @Input() selectionType = 'single';
  @Output() select = new EventEmitter<Array<any>>();
  dataTemp = [];
  rows2;
  @Input() selected = [];
  c;
  constructor() {
  }
  change(event: { value: string; name: string }) {
    this.rows = this.rows2;
    this.dataTemp = this.rows;
    const val = event.value;
    const colName = event.name;
    // filter our data
    if (val && val.trim() !== '') {
      this.rows = this.dataTemp.filter(d => {
        if (d[colName] !== '') {
          return (
            d[colName]
              .toString()
              .toLowerCase()
              .indexOf(val) !== -1 || !val
          );
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
    if (changes.rows) {
      if (changes.rows.currentValue) {
        this.rows = [...changes.rows.currentValue];
        this.rows2 = this.rows;
        setTimeout(() => {
          this.loadingIndicator = false;
        }, 1000);
      }
    }
    if (changes.selected) {
      if (changes.selected.currentValue) {
        this.selected = [...changes.selected.currentValue];
      }
    }
  }
  onSelect(event) {
    this.select.emit(event.selected);
  }
  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }
  selectFn(d) {
    console.log(d);
  }

  onActivate(event) {}
}
