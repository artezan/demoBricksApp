import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss']
})
export class GeneralDialogComponent implements OnInit {
 public  dataInput: { monto: string; balanceBefore: string; balanceAfter: string };
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { monto: string; balanceBefore: string; balanceAfter: string }
  ) {
    this.dataInput = data;
  }

  ngOnInit() {}
}
