import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemDetailPage } from '../item-detail/item-detail.page';
import { CartService } from './../../services/cart.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.page.html',
	styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {
	constructor(
		private cart: CartService,
		private modalController: ModalController
	) {}

	public cart$ = this.cart.cart$;

	ngOnInit() {}

	closeCart() {
		this.modalController.dismiss({
			dismissed: true
		});
	}

	async showItemDetail(menuItem) {
		const modal = await this.modalController.create({
			component: ItemDetailPage,
			componentProps: {
				item: menuItem,
				fromCart: true
			},
			cssClass: 'pop-up-modal'
		});
		return await modal.present();
	}

	cartCost() {
		let sum = 0;
		this.cart$.value.forEach(item => {
			sum += item.price;
		});
		return sum.toFixed(2);
	}
}
