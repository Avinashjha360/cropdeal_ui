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
  displayedColumns: string[] = ['position', 'name', 'category', 'price', 'quantity', 'image'];
  dataSource = [...this.ELEMENT_DATA];
  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  constructor(private authService: AuthService, private productService: ProductService, private dialog: MatDialog) { }

  saveNewData(){
    this.openPopup("Add New Product", null);
  }
  editData(product:any){    
    this.openPopup("Edit Product", product);
  }
  openPopup(title:string, data:any) {
    var _pupup = this.dialog.open(DialogComponent, {
      width: "50%",
      height: "90%",
      data: {
        title: title,
        data:data
      }
    });

    _pupup.afterClosed().subscribe(item => {      
      if (item) {
        this.ELEMENT_DATA.push(item);
        this.dataSource.push(this.ELEMENT_DATA[this.ELEMENT_DATA.length]);
        this.table.renderRows();
      }

    })
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.productService.getProductsByUserId(userId).subscribe((res: any) => {
      if (res.data) {
        this.ELEMENT_DATA = res.data;
      }

    })
  }


}
