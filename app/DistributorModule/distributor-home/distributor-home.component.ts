// Developer Name: Maski Saijahnavi 
import { Component, OnInit } from '@angular/core';
import { ProductOrder } from 'src/app/Models/product-order';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from "jquery";
import { ProductOrdersService } from 'src/app/Services/product-orders.service';
import { ProductOrderDetail } from 'src/app/Models/product-order-detail';
import { ProductOrderDetailsService } from 'src/app/Services/product-order-details.service';
import { ProductsService } from 'src/app/Services/products.service';
import { Product } from 'src/app/Models/product';

@Component({
  selector: 'app-distributor-home',
  templateUrl: './distributor-home.component.html',
  styleUrls: ['./distributor-home.component.scss']
})

export class DistributorHomeComponent implements OnInit {
  productorders: ProductOrder[] = [];
  productorderdetails: ProductOrderDetail[] = [];
  deleteProductOrderForm: FormGroup;
  viewProductOrderCheckBoxes: any;
  deleteProductOrderDisabled: boolean;
  showProductOrdersSpinner: boolean;
  orderDetailForm: FormGroup;
  productnames: string[];
  products: Product[] = [];

  sortBy: string = "ProductOrderID";
  sortDirection: string = "ASC";
  constructor(private productordersService: ProductOrdersService, private productorderdetailsService: ProductOrderDetailsService, private productsService: ProductsService) {

    this.viewProductOrderCheckBoxes = {
      OrderID: true,
      TotalPrice: true,
      TotalQuantity: true,
      createdOn: true,
      lastModifiedOn: true
    };
    this.deleteProductOrderForm = new FormGroup({
      id: new FormControl(null),
      orderID: new FormControl(null),

    });

    this.orderDetailForm = new FormGroup({
      id: new FormControl(null),
      productName: new FormControl(null),
      quantity: new FormControl(null),
      totalPrice: new FormControl(null)

    });

  }
  ngOnInit() {

    this.productordersService.GetAllProductOrders().subscribe((response) => {
      this.productorders = response;
    }, (error) => {
      console.log(error);
    });
  }

  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewProductOrderCheckBoxes)) {
      this.viewProductOrderCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewProductOrderCheckBoxes)) {
      this.viewProductOrderCheckBoxes[propertyName] = false;
    }
  }
  onDeleteProductOrderClick(index) {
    this.deleteProductOrderForm.reset();
    this.deleteProductOrderForm["submitted"] = false;
    this.deleteProductOrderForm.patchValue({
      id: this.productorders[index].id,
      orderID: this.productorders[index].productorderID,

    });

  }

  onDeleteProductOrderConfirmClick(event) {
    console.log(1233);
    this.deleteProductOrderForm["submitted"] = true;

    this.deleteProductOrderDisabled = true;
    var ProductOrder: ProductOrder = this.deleteProductOrderForm.value;

    this.productordersService.DeleteProductOrder(ProductOrder.productorderID, ProductOrder.id).subscribe((deleteResponse) => {
      this.deleteProductOrderForm.reset();

      $("#btnDeleteSupplierCancel").trigger("click");
      this.deleteProductOrderDisabled = false;
      this.showProductOrdersSpinner = true;

      this.productordersService.GetAllProductOrders().subscribe((getResponse) => {
        this.showProductOrdersSpinner = false;
        this.productorders = getResponse;
      }, (error) => {
        console.log(error);
      });
    },
      (error) => {
        console.log(error);
        this.deleteProductOrderDisabled = false;
      });
  }



  onBtnSortClick() {
    console.log(this.sortBy);
    this.productorders.sort((a, b) => {
      let comparison = 0;
      let value1 = ((typeof a[this.sortBy]) == 'string') ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      let value2 = ((typeof b[this.sortBy]) == 'string') ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (value1 < value2) {
        comparison = -1;
      }
      else if (value1 > value2) {
        comparison = 1;
      }
      if (this.sortDirection == "DESC")
        comparison = comparison * -1;

      console.log(value1, value2, comparison);
      return comparison;
    });

  }
  onProductOrderDetailClick(index) {
    var productorder: ProductOrder;
    var product: Product;
    var productorderdetail: any;


    productorder = this.productorders[index];
    this.productorderdetailsService.GetProductOrderDetailByProductOrderID(productorder.productorderID).subscribe((response) => {
      this.productorderdetails = response;
      let i = 0;
      console.log(6666666666666666);
      for (productorderdetail in this.productorderdetails) {
        this.productsService.GetProductByProductID(productorderdetail.productorderID).subscribe((getResponse) => {
          this.showProductOrdersSpinner = false;
          console.log(77777777777777);
          this.products[i] = getResponse;
          this.productnames[i] = this.products[i].productName;
          console.log(88888888888);
          console.log(this.productnames[i])
          i += 1;
        }, (error) => {
          console.log(error);
        });
      }
    },
      (error) => {
        console.log(error);
      });

  }
}
