import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CmsService } from '../cms.service';
@Component({
    selector: 'app-my-dialog',
    templateUrl: './my-dialog.component.html'
})
export class MyDialogComponent implements OnInit {
    constructor(private cmsService: CmsService, public dialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit() { }
    onNoClick() {
        this.dialogRef.close();
    }
    onYesClick(data) {
        data[0]['type'] = "DELETE";
        this.cmsService.deletePlayList(data[0]).subscribe(response => {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                data[1].loadPlaylist();
                data[2].onClear();
            }
            this.dialogRef.close();
        });
    }
}