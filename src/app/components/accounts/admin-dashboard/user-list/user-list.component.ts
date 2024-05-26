import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../../Service/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatIcon, FormsModule, MatTable, MatTableModule, MatButtonModule, MatPaginator, MatPaginatorModule, MatFormField, MatLabel, MatInputModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'phone', 'role', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUser().subscribe((res: any) => {
      if (res.data) {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(user: any){
    this.openPopup("Edit User", user);
  }

  openPopup(title: string, row: any) {
    var _pupup = this.dialog.open(DialogComponent, {
      width: "50%",
      height: "55%",
      data: {
        title: title,
        data: row
      }
    });

    _pupup.afterClosed().subscribe(item => {
      this.getAllUsers();
    })
  }

}
