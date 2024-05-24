import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from '../../../../models/products';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../../Service/product.service';
import { AuthService } from '../../../../Service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../dialog/dialog.component';


interface PeriodicElement {
  position: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, MatTable, MatTableModule, MatButtonModule],
  templateUrl: `add-product.component.html`,
  styleUrl: './add-product.component.css'
})



export class AddProductComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  constructor(private authService: AuthService, private productService: ProductService, private dialog:MatDialog) { }

  openPopup(){
  var _pupup =  this.dialog.open(DialogComponent,{
      width:"70%",
      data:{
        title: 'Product Table'
      }
    });

    _pupup.afterClosed().subscribe(item=>{
      console.log(item);
      
    })
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.productService.getProductsByUserId(userId).subscribe((res: any) => {
      if (res.data) {
        console.log(res.data);
        this.ELEMENT_DATA = res.data;
        console.log(this.ELEMENT_DATA);
      }

    })
  }
  displayedColumns: string[] = ['position', 'name', 'category', 'price', 'quantity', 'image'];
  dataSource = [...this.ELEMENT_DATA];

  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.ELEMENT_DATA.length);
    this.dataSource.push(this.ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }
}
