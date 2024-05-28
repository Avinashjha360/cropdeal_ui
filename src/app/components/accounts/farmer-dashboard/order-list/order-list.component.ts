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
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../Service/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatIcon, FormsModule, MatTable, MatTableModule, MatButtonModule, MatPaginator, MatPaginatorModule, MatFormField, MatLabel, MatInputModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class FramerOrderListComponent implements OnInit {
  orders = [
    {
      "orderId": "123456",
      "transactionId": "789012",
      "date": "2024-05-26T07:15:35.702Z",
      "item": {
        "id": "654321",
        "userId": "user123",
        "products": [
          {
            "productId": "p001",
            "userId": "user123",
            "name": "Product 1",
            "category": "Category 1",
            "location": "Location 1",
            "image": "image1.jpg",
            "price": 10,
            "quantity": 2
          },
        ],
        "totalAmount": 35
      }
    }
  ];

  displayedColumns: string[] = ['orderId', 'transactionId', 'date', 'quantity', 'totalAmount', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService:OrderService, private authService:AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(){
    const userId = this.authService.getUserId();
    this.orderService.getUserOrdersByProductUserId(userId).subscribe((res:any)=>{
      if (res) {
        this.dataSource = new MatTableDataSource(res);
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
  
  view(order: any){
    this.openPopup("view", order);
  }

  delete(order: any){
    this.openPopup("delete", order);
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
      console.log(item);
      this.getAllOrder();
      
    })
  }
}