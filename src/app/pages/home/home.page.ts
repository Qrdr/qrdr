import { Component } from '@angular/core';
import { MenuService } from './../../services/menu.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	constructor(private menu: MenuService) {}

	public featuredItems$ = this.menu.featuredItems$;
}
