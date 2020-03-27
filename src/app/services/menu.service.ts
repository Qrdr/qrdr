import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	menu$ = new BehaviorSubject([]);
	menuItems$ = new BehaviorSubject([]);
	featuredItems$ = new BehaviorSubject([]);

	constructor(private http: HttpClient) {}

	initializeMenu() {
		this.http.get('assets/test.json').subscribe(result => {
			let menu = result['menu'];
			this.menu$.next(menu);
			// Finds all menu items not in subsections
			let menuItems = menu
				.map(element => element['children'])
				.flat()
				.filter(element => element['type'] == 'item');
			//
			// ALTERNATIVE METHOD FOR FILTERING FOR MENU ITEMS
			// menu.map(element => element.children.filter(element => element.type.indexOf('item') !== -1)).flat()
			//
			// Adds all menu items in subsections to menuItem
			menuItems = menuItems.concat(
				menu
					.map(element => element['children'])
					.flat()
					.filter(element => element['type'] == 'subsection')
					.map(element => element['children'])
					.flat()
			);
			this.menuItems$.next(menuItems);
			// Finds all featured items in the menu
			let featuredItems = this.searchMenuItemsWithKey('tags', 'Featured', true);
			this.featuredItems$.next(featuredItems);
			// console.log(menu);
			//console.log(menuItems);
			//console.log(featuredItems);
		});
	}

	// Searches the menuitems given a key and value
	// Strict determines whether or not to look for an exact match

	searchMenuItemsWithKey(key: string, value: string, exact: boolean = false) {
		let menuItems = this.menuItems$.value;
		if ((exact = false)) {
			let result = menuItems
				.filter(menuItem => menuItem[key])
				.filter(element => element[key].indexOf(value) !== -1);
			console.log(result);
			return result;
		} else {
			if (key == 'tags') {
				return menuItems
					.filter(menuItem => menuItem[key])
					.filter(element => element[key].includes(value) == true);
			} else {
				return menuItems
					.filter(menuItem => menuItem[key])
					.filter(element => element[key] == value);
			}
		}
	}
}
