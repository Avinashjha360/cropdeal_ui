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
import { AuthService } from '../../../../Service/auth.service';
import { ProductService } from '../../../../Service/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatIcon, FormsModule, MatTable, MatTableModule, MatButtonModule, MatPaginator, MatPaginatorModule, MatFormField, MatLabel, MatInputModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'category', 'price', 'quantity', 'available', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((res: any) => {
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

  edit(product: any){
    this.openPopup("Edit Product", product);
  }

  openPopup(title: string, row: any) {
    var _popup = this.dialog.open(DialogComponent, {
      width: "50%",
      data: {
        title: title,
        data: row
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.getAllProducts();
    })
  }

}