import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '@app/order-summary/services/OrderService';
import {OrderDTO} from '@app/order-summary/models/OrderDTO';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-order-summary',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  orderSummary: OrderDTO;
  obj: any;
  total?: any;
  showDialog:boolean = false;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) {
  }

  ngOnInit() {
    // 'data' query param contains the order summary details
    const data = this.route.snapshot.queryParams['data'];
    // Check if data exists
    if(!data) {
      console.error('No order data found in query parameters.');
      this.orderSummary = {foodItemList: []} as any;
      return;
    }
    // Try to parse the JSON data
    try {
      this.obj = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing order data:', error);
      this.orderSummary = {foodItemsList: []} as any;
      return;
    }
    // For testing purposes, set userId to 1
    this.obj.userId =1;
    // Ensure foodItemsList is an array
    if (!Array.isArray(this.obj.foodItemsList)) {
      this.obj.foodItemsList = [];
    }

    // Assign parsed object to orderSummary
    this.orderSummary = this.obj as OrderDTO;
    console.log("orderSummary: ", this.orderSummary);

    // Calculate total cost
    const items = this.orderSummary.foodItemList ?? [];
    this.total = items.reduce(
      (accumulator, item) => {return accumulator + (item.quantity * item.price);
    },0).toFixed(1);
  }

  /**
   * Saves the order by calling the OrderService.
   */
  saveOrder() {
    this.orderService.saveOrder(this.orderSummary).subscribe(
      response => {this.showDialog = true;},
      error => {console.error('Error saving order:', error);}
    )
  }

  /**
   * Closes the dialog and navigates back to the home page.
   */
  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']);
  }
}
