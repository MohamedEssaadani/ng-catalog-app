import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    //let host = (Math.random()>0.2) ? environment.host : environment.unreachableHost;
    let host = environment.host;
    return this.httpClient.get<Product[]>(host+"/products");
  }

  getSelectedProducts(): Observable<Product[]>{
    let host = environment.host;
    return this.httpClient.get<Product[]>(host+"/products?selected=true");
  }

  getAvailableProducts(): Observable<Product[]>{
    let host = environment.host;
    return this.httpClient.get<Product[]>(host+"/products?available=true");
  }

  searchProducts(keyword:string): Observable<Product[]>{
    let host = environment.host;
    return this.httpClient.get<Product[]>(`${host}/products?name_like=${keyword}`);

  }

  changeSelect(product: Product) {
    let host = environment.host;
    product.selected = !product.selected;
    return this.httpClient.put<Product>(`${host}/products/${product.id}`,product);

  }

  deleteProduct(product: Product) {
    let host = environment.host;
    return this.httpClient.delete<void>(`${host}/products/${product.id}`);

  }
}
