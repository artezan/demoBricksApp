import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  DoCheck,
  ViewChild
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralTableComponent implements OnInit, OnChanges {
  @Input() rowDeselect = [];
  @Input() rows = [];
  @Input() columns = [{ name: '', prop: '', width: '' }];
  @Input() loadingIndicator: boolean;
  @Input() checkColum = false;
  @Input() selectionType = 'single';
  @Output() select = new EventEmitter<Array<any>>();
  // list
  @Input() itemsToShow = [1, 2, 3];
  dataTemp = [];
  rows2;
  food;
  @Input() selected = [];
  @Input() changeToTable = false;
  isDevice: boolean;
  isDevice$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  arrHelp = [];
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isDevice$.subscribe(isDev => {
         if (isDev) {
           this.isDevice = true;
         } else {
           this.isDevice = false;
         }
    });
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
  // movil
  changeMovil(event) {
    const arr = [];
    this.rows = this.rows2;
    this.dataTemp = this.rows;
    const value: string = event.target.value.toLowerCase();
    const keys = this.columns.map(colum => colum.prop);
    if (value && value.trim() !== '') {
      this.rows.forEach(row => {
        Object.keys(row).forEach(key => {
          const pos = row[key].toString().toLowerCase().indexOf(value);
          const pos2 = arr.indexOf(row);
          if (pos !== -1 && pos2 === -1) {
            arr.push(row);
          }
        });
      });
      this.rows = arr;
    } else {
      this.rows = this.rows2;
    }
    // this.rows = this.rows2;
    // this.dataTemp = this.rows;
    // const val = event.value;
    // const colName = event.name;
    // // filter our data
    // if (val && val.trim() !== '') {
    //   this.rows = this.dataTemp.filter(d => {
    //     if (d[colName] !== '') {
    //       return (
    //         d[colName]
    //           .toString()
    //           .toLowerCase()
    //           .indexOf(val) !== -1 || !val
    //       );
    //     }
    //   });
    // } else {
    //   this.rows = this.rows2;
    // }
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
    if (changes.rowDeselect) {
      if (changes.rowDeselect.currentValue) {
        if (this.selectionType === 'multiClick') {
          this.isDevice$.subscribe(isDev => {
            if (isDev) {
              if (changes.rowDeselect.previousValue !== changes.rowDeselect.currentValue) {
                 this.deselectList(changes.rowDeselect.currentValue);
              }

            }
          });
        }
      }
      // if (this.selectionType === 'multiClick') {
      //   this.isDevice$.subscribe(isDev => {
      //     if (isDev) {
      //       this.deselectList(changes.selected.currentValue);
      //     }
      //   });
      // }
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
  // list
  handleSelection(event) {
    if (event.option.selected && this.selectionType === 'single') {
      event.source.deselectAll();
      event.option._setSelected(true);
    }
  }
  deselectList(itemDeselct) {
    if (this.rows) {
      this.rows.forEach((row, i) => {
        itemDeselct.forEach(element => {
          if (element === row) {
            this.rows[i].isSelect = false;
            this.arrHelp.splice(this.arrHelp.indexOf(row), 1);
          }
        });
      });
    }
  }
  onClickList(value) {
    if (this.selectionType === 'single') {
      this.arrHelp.length = 0;
      this.arrHelp.push(value);
      this.select.emit(this.arrHelp);
    } else {
      const isFinded = this.arrHelp.find(item => item === value);
      if (isFinded) {
        this.arrHelp.splice(this.arrHelp.indexOf(value), 1);
      } else {
        this.arrHelp.push(value);
      }
      this.select.emit(this.arrHelp);
    }
  }
}
