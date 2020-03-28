import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GeneralService {
	public noMouse: boolean;

	constructor() {
		this.noMouse = matchMedia('(any-pointer:fine )').matches;
		// console.log('service', this.noMouse);
	}
}
