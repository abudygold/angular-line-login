import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import liff from '@line/liff';
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

		const token = 'HPnl7NLuQPG/X69QwX71J+F2NGi2EfJmKCmjLS0raELWZbAfGu2JkWIJqjPEsRJ0r7VJgNNlKJCCUjlz9Rv/ee8BB7GsOAmtl431V8le0IF+JbyD0ylYwgA28pGz/XPxzaguf++elBQ/WRzfCGw/eQdB04t89/1O/w1cDnyilFU=';

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
