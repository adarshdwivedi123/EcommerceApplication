import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../../common/order-history';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{

  orderHistoryList:OrderHistory[]=[];
  storage:Storage=sessionStorage;
  constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
