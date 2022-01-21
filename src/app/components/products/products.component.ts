import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppData, DataStateEnum} from "../../state/product.state";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppData<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
  }


  onGetAllProducts() {
    this.products$ = this.productService
      .getAllProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=> of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetSelectedProducts() {
    this.products$ = this.productService
      .getSelectedProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=> of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService
      .getAvailableProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=> of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onSearch(dataForm:any) {
    this.products$ = this.productService
      .searchProducts(dataForm.keyword)
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=> of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onChangeSelect(p:Product) {
    this.productService
      .changeSelect(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onDeleteProduct(product: Product) {
    let response = confirm("Etes vous sur de vouloir supprimer?");
    if(response === true){
      this.productService
        .deleteProduct(product)
        .subscribe(data=>{
          this.onGetAllProducts();
        });
    }
  }
}
