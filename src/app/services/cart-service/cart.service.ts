import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	constructor(private toastController: ToastController) {}

	cart$ = new BehaviorSubject([]);

	initializeCart() {
		this.cart$.next([]);
	}

	getCart() {
		this.cart$.subscribe(result => console.log('CART:', result));
	}

	//Adds menu item to the cart with an id and displays a toast of the item added
	async addCart(menuItem, additionalInstructions = '') {
		// Creates a copy of the menuItem
		let cartItem = JSON.parse(JSON.stringify(menuItem));
		// Adds any additionalInstructions to cartItem
		cartItem.additionalInstructions = additionalInstructions;
		// Updates cart and adds cartIds
		let newCart = [...this.cart$.value, cartItem];
		newCart.forEach((item, index) => {
			item.cartId = index;
		});
		this.cart$.next(newCart);
		let toast = await this.toastController.create({
			message: `${menuItem.name} Added`,
			duration: 1000,
			position: 'top',
			color: 'primary'
			//showCloseButton: true
		});
		toast.present();
		console.log(this.cart$.value);
	}

	removeCart(cartId) {
		let newCart = [...this.cart$.value];
		newCart = newCart.filter((value, index) => {
			return index != cartId;
		});
		newCart.forEach((item, index) => {
			item.cartId = index;
		});
		this.cart$.next(newCart);
	}

	//INSERT FIREBASE CODE HERE
	checkout() {
		let cartString = JSON.stringify(this.cart$.value);
		console.log(cartString);
		alert(cartString);
	}
}
