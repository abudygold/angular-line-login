import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!request || !request.url) {
			return next.handle(request);
		}

		const token = localStorage.getItem('LIFF_STORE:1657235309-waB8qN21:accessToken');

		if (!!token) {
			const headers = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			};

			request = request.clone({
				setHeaders: headers,
			});
		}

		return next.handle(request);
	}
}
