import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ItemDetailPage } from './../../pages/item-detail/item-detail.page';
import { CartService } from './../../services/cart.service';
import { GeneralService } from './../../services/general.service';
import { MenuService } from './../../services/menu.service';

@Component({
	selector: 'app-featured-items',
	templateUrl: './featured-items.component.html',
	styleUrls: ['./featured-items.component.scss']
})
export class FeaturedItemsComponent implements OnInit {
	constructor(
		private sanitizer: DomSanitizer,
		private menu: MenuService,
		private cart: CartService,
		private general: GeneralService,
		private modalController: ModalController
	) {}

	public featuredItems$ = this.menu.featuredItems$;

	ngOnInit() {}

	sanitizeStyle(unsafeStyle: string) {
		return this.sanitizer.bypassSecurityTrustStyle(unsafeStyle);
	}

	// Does not show the model if the add-button is not clicked
	async showItemDetail(event, menuItem) {
		if (!event.target.className.includes('add-button')) {
			const modal = await this.modalController.create({
				component: ItemDetailPage,
				componentProps: {
					item: menuItem
				},
				cssClass: 'pop-up-modal'
			});
			return await modal.present();
		}
	}
}
