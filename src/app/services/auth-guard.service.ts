import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	routingUrl: any = '';
	constructor(
		private readonly router: Router,
		private readonly tokenService: TokenService
	) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const currentUser = this.tokenService.gettoken();
		if (currentUser) {
			// 	const isAuthorized = next.data.roles;
			// if (isAuthorized) {
			// 	return true;
			// }
			// this.router.navigate(['/unauthorized']);
			return true;
		}
		this.router.navigate(['/auth/login']);
		return false;
	}
}
