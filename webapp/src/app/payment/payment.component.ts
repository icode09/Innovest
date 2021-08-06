import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  amount:any;
  constructor() { }
  handler:any = null;

  ngOnInit(): void {
    this.loadStripe();
  }
  pay(amount:any) {    
  
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JKLrwSAQeukN9L81vhY7IqniVtz7WRhCd8filel69EzUAjbG9wdnl8qdMYcKoCM6l8YXptbzlgybWoZlPurBW4g00slp67OCL',
      locale: 'auto',
      token: function (token: any) {
        console.log(token)
        //alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Innovest',
      description: 'payment widget',
      amount: amount * 100
    });
  }
  loadStripe() {
      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JKLrwSAQeukN9L81vhY7IqniVtz7WRhCd8filel69EzUAjbG9wdnl8qdMYcKoCM6l8YXptbzlgybWoZlPurBW4g00slp67OCL',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
        
      window.document.body.appendChild(s);
    }
  }
}

