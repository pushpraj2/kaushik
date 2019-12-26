import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { InventoryComponentBase } from '../../inventory-component';
import { Distributor } from 'src/app/Models/distributor';
import { ProductOrder } from 'src/app/Models/product-order';
import { DistributorsService } from 'src/app/Services/distributors.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ProductOrdersService } from 'src/app/Services/product-orders.service';
import { ProductOrderDetailsService } from 'src/app/Services/product-order-details.service';
import { Product } from 'src/app/Models/product';
import { ProductOrderDetail } from 'src/app/Models/product-order-detail';

@Component({
  selector: 'app-new-products-order',
  templateUrl: './new-product-orders.component.html',
  styleUrls: ['./new-product-orders.component.scss']
})
export class ProductOrderComponent extends InventoryComponentBase implements OnInit {
  distributors: Distributor[] = [];
  products: Product[] = [];
  order: ProductOrder;
  productorders: ProductOrder[] = [];
  productorderdetails: ProductOrderDetail[] = [];

  showOrderSpinner: boolean = false;

  newOrderForm: FormGroup;
  newOrderDisabled: boolean = false;
  newOrderFormErrorMessages: any;

  constructor(private distributorsService: DistributorsService, private productsService: ProductsService, private ordersService: ProductOrdersService, private orderDetailsService: ProductOrderDetailsService) {
    super();
    this.newOrderForm = new FormGroup({
      productorderDate: new FormControl(new Date().toLocaleDateString()),
      distributorID: new FormControl(null),
      totalQuantity: new FormControl(0),
      totalAmount: new FormControl(0),
      orderDetails: new FormArray([
        new FormGroup({
          orderID: new FormControl(null),
          productCode: new FormControl(null, [Validators.required]),
          productName: new FormControl(null),
          productID: new FormControl("", [Validators.required]),
          unitPrice: new FormControl(null),
          quantity: new FormControl(1, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
          totalAmount: new FormControl(null)

        })
      ])
    });
  }

  ngOnInit() {
    this.showOrderSpinner = true;
    this.distributorsService.GetAllDistributors().subscribe((response) => {
      this.distributors = response;
      this.showOrderSpinner = false;
    }, (error) => {
      console.log(error);
    });

    this.productsService.GetAllProducts().subscribe((response) => {
      this.products = response;
    }, (error) => {
      console.log(error);
    });
  }

  onBtnAddProductClick() {
    (this.newOrderForm.get('orderDetails') as FormArray).push(new FormGroup({
      orderID: new FormControl(null),
      productCode: new FormControl(null, [Validators.required]),
      productName: new FormControl(null),
      productID: new FormControl("", [Validators.required]),
      unitPrice: new FormControl(null),
      quantity: new FormControl(1, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      totalAmount: new FormControl(null)
    }));
  }

  onQuantityChange(index: number) {
    var currentFormGroup: FormGroup = (this.newOrderForm.get('orderDetails') as FormArray).at(index) as FormGroup;
    var quantity = Number(currentFormGroup.get('quantity').value);
    var unitPrice = Number(currentFormGroup.get('unitPrice').value);

    currentFormGroup.patchValue({
      totalAmount: quantity * unitPrice
    });
  }

  onProductDropDownChange(index: number) {
    var currentFormGroup: FormGroup = (this.newOrderForm.get('orderDetails') as FormArray).at(index) as FormGroup;
    var currentProductID = currentFormGroup.get('productID').value;
    this.productsService.GetProductByProductID(currentProductID).subscribe((response: any) => {
      if (response.length > 0) {
        currentFormGroup.patchValue({
          productName: response[0].productName,
          unitPrice: response[0].unitPrice,
          totalAmount: response[0].unitPrice,
        });
      }
    },
      (error) => {
        console.log(error);
      });
  }


  onProductDeleteClick(index: number) {
    if (confirm("Are you sure to delete?")) {
      (this.newOrderForm.get('orderDetails') as FormArray).removeAt(index);
    }
  }




  onAddOrderClick(event) {
    this.newOrderForm["submitted"] = true;
    console.log(this.newOrderForm.valid);
    this.newOrderDisabled = true;
    var order1: ProductOrder = new ProductOrder(null, null, null, null, null, null, null, null);
    var orderdetail: ProductOrderDetail = new ProductOrderDetail(null, null, null, null, null, null, null, null, null);
    var array: FormArray = this.newOrderForm.get('orderDetails') as FormArray;

    console.log(array);
    order1.totalQuantity = 0;
    for (let i = 0; i < array.value.length; i++) {
      order1.totalQuantity += array.value[i].quantity;
    }
    console.log(order1.totalQuantity);
    for (let i = 0; i < array.length; i++) {
      order1.totalAmount += array.value[i].totalAmount;
    }
    console.log(order1.totalAmount);
    if (confirm("Do you want to place order")) {

      this.ordersService.AddProductOrder(order1).subscribe((addResponse) => {

        for (let i = 0; i < array.value.length; i++) {
          orderdetail.productorderID = order1.productorderID;
          orderdetail.productID = array.value[i].productID;
          orderdetail.productName = this.products.filter((pro) => { return pro.productID == array.value[i].productID })[0].productName;
          orderdetail.quantity = array.value[i].quantity;
          orderdetail.totalAmount = array.value[i].totalAmount;
          orderdetail.unitPrice = array.value[i].unitPrice;
          orderdetail.id = i + 1;

          this.orderDetailsService.AddProductOrderDetail(orderdetail).subscribe((addResponse) => {

            console.log(addResponse);
            this.orderDetailsService.GetAllProductOrderDetails().subscribe((getResponse) => {

              this.productorderdetails = getResponse;
            },
              (error) => {
                console.log(error);
              });
            this.newOrderForm.reset();
            this.newOrderDisabled = false;
            this.showOrderSpinner = true;

            this.ordersService.GetAllProductOrders().subscribe((getResponse) => {
              this.showOrderSpinner = false;
              this.productorders = getResponse;
              console.log(this.productorderdetails);
            }, (error) => {
              console.log(error);
            });
          },
            (error) => {
              console.log(error);
              this.newOrderDisabled = false;
            });
        }
      },
        (error) => {
          console.log(error);
          this.newOrderDisabled = false;
        });
    }
  }
}
