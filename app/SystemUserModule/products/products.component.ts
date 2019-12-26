import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { ProductsService } from '../../Services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends InventoryComponentBase implements OnInit
{
  products: Product[] = [];
  showProductsSpinner: boolean = false;
  viewProductCheckBoxes: any;

  sortBy: string = "productName";
  sortDirection: string = "ASC";

  newProductForm: FormGroup;
  newProductDisabled: boolean = false;
  newProductFormErrorMessages: any;

  editProductForm: FormGroup;
  editProductDisabled: boolean = false;
  editProductFormErrorMessages: any;

  deleteProductForm: FormGroup;
  deleteProductDisabled: boolean = false;

  constructor(private productsService: ProductsService) {
    super();
    this.newProductForm = new FormGroup({
      productName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      productCode: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      productType: new FormControl(null, [Validators.required]),
      productUnitPrice: new FormControl(null, [Validators.required])
    });

    this.newProductFormErrorMessages = {
      productName: { required: "Product Name can't be blank", minlength: "Product Name should contain at least 2 characters", maxlength: "Product Name can't be longer than 40 characters" },
      productCode: { required: "Product Code can't be blank", minlength: "Product Code should contain at least 2 characters", maxlength: "Product Code can't be longer than 40 characters" },
      productType: { required: "Type should be selected" },
      productUnitPrice: { required: "Unit Price can't be blank" }
    };

    this.editProductForm = new FormGroup({
      id: new FormControl(null),
      productID: new FormControl(null),
      productName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      productCode: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      productType: new FormControl(null, [Validators.required]),
      productUnitPrice: new FormControl(null, [Validators.required]),
      creationDateTime: new FormControl(null)
    });

    this.editProductFormErrorMessages = {
      productName: { required: "Product Name can't be blank", minlength: "Product Name should contain at least 2 characters", maxlength: "Product Name can't be longer than 40 characters" },
      productCode: { required: "Product Code can't be blank", minlength: "Product Code should contain at least 2 characters", maxlength: "Product Code can't be longer than 40 characters" },
      productUnitPrice: { required: "Unit Price can't be blank" }
    };

    this.viewProductCheckBoxes = {
      productName: true,
      productCode: true,
      productType: true,
      productUnitPrice: true,
      createdOn: true,
      lastModifiedOn: true
    };

    this.deleteProductForm = new FormGroup({
      id: new FormControl(null),
      productID: new FormControl(null),
      productName: new FormControl(null)
    });
  }

  ngOnInit() {
    this.showProductsSpinner = true;
    this.productsService.GetAllProducts().subscribe((response) => {
      this.products = response;
      this.showProductsSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateProductClick() {
    this.newProductForm.reset();
    this.newProductForm["submitted"] = false;
  }

  onAddProductClick(event) {
    this.newProductForm["submitted"] = true;
    if (this.newProductForm.valid) {
      this.newProductDisabled = true;
      var product: Product = this.newProductForm.value;

      this.productsService.AddProduct(product).subscribe((addResponse) => {
        this.newProductForm.reset();
        $("#btnAddProductCancel").trigger("click");
        this.newProductDisabled = false;
        this.showProductsSpinner = true;

        this.productsService.GetAllProducts().subscribe((getResponse) => {
          this.showProductsSpinner = false;
          this.products = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newProductDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newProductForm);
    }
  }

  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newProductFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }

  onEditProductClick(index) {
    this.editProductForm.reset();
    this.editProductForm["submitted"] = false;
    this.editProductForm.patchValue({
      id: this.products[index].id,
      productID: this.products[index].productID,
      productName: this.products[index].productName,
      productCode: this.products[index].productCode,
      productType: this.products[index].productType,
      productUnitPrice: this.products[index].productUnitPrice,
      creationDateTime: this.products[index].creationDateTime
    });
  }

  onUpdateProductClick(event) {
    this.editProductForm["submitted"] = true;
    if (this.editProductForm.valid) {
      this.editProductDisabled = true;
      var product: Product = this.editProductForm.value;

      this.productsService.UpdateProduct(product).subscribe((updateResponse) => {
        this.editProductForm.reset();
        $("#btnUpdateProductCancel").trigger("click");
        this.editProductDisabled = false;
        this.showProductsSpinner = true;

        this.productsService.GetAllProducts().subscribe((getResponse) => {
          this.showProductsSpinner = false;
          this.products = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editProductDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editProductForm);
    }
  }

  onDeleteProductClick(index) {
    this.deleteProductForm.reset();
    this.deleteProductForm["submitted"] = false;
    this.deleteProductForm.patchValue({
      id: this.products[index].id,
      productID: this.products[index].productID,
      productName: this.products[index].productName
    });
  }

  onDeleteProductConfirmClick(event) {
    this.deleteProductForm["submitted"] = true;
    if (this.deleteProductForm.valid) {
      this.deleteProductDisabled = true;
      var product: Product = this.deleteProductForm.value;

      this.productsService.DeleteProduct(product.productID, product.id).subscribe((deleteResponse) => {
        this.deleteProductForm.reset();
        $("#btnDeleteProductCancel").trigger("click");
        this.deleteProductDisabled = false;
        this.showProductsSpinner = true;

        this.productsService.GetAllProducts().subscribe((getResponse) => {
          this.showProductsSpinner = false;
          this.products = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteProductDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteProductForm);
    }
  }

  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewProductCheckBoxes)) {
      this.viewProductCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewProductCheckBoxes)) {
      this.viewProductCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    this.products.sort((a, b) => {
      let comparison = 0;
      let value1 = ((typeof a[this.sortBy]) == 'string') ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      let value2 = ((typeof b[this.sortBy]) == 'string') ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (this.sortBy == "creationDateTime" || this.sortBy == "lastModifiedDateTime") {
        var tt = value1.split("/");
        var d1 = new Date(tt[2], tt[1], tt[0]);
        tt = value2.split("/");
        var d2 = new Date(tt[2], tt[1], tt[0]);
        if (d2 > d1) comparison = -1;
        else comparison = 1;
      }
      else {
        if (value1 < value2) {
          comparison = -1;
        }
        else if (value1 > value2) {
          comparison = 1;
        }
      }
      if (this.sortDirection == "DESC")
        comparison = comparison * -1;

      return comparison;
    });

  }

}
