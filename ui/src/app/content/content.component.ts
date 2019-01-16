import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { title } from '../../environments/server';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	title = title;
	user = 'john.doe@vmware.com';

	constructor(private router: Router) { }

	ngOnInit() {
	}

	back(): void {
		this.router.navigateByUrl('/');
	}
}
