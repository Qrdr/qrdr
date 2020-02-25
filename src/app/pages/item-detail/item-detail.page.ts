import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from './../../services/cart.service';

@Component({
	selector: 'app-item-detail',
	templateUrl: './item-detail.page.html',
	styleUrls: ['./item-detail.page.scss']
})
export class ItemDetailPage implements OnInit {
	@Input() item: any;
	// Checks if the page is called from the cart
	// If true, it changes the add to cart button to remove from cart
	@Input() fromCart: boolean;
	additionalInstructions: string = '';

	constructor(
		private cart: CartService,
		private modalController: ModalController
	) {}

	ngOnInit() {}

	getAdditionalInstructions() {
		console.log(this.item);
		if (this.item.additionalInstructions) {
			return this.item.additionInstructions;
		} else {
			return '';
		}
	}

	closeItemDetail() {
		this.modalController.dismiss({
			dismissed: true
		});
	}

	addCart(cartItem, additionalInstructions) {
		this.cart.addCart(cartItem, additionalInstructions);
		this.closeItemDetail();
	}

	removeCart(cartItem) {
		this.cart.removeCart(cartItem);
		this.closeItemDetail();
	}
}
