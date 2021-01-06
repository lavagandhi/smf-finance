import { Injectable } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
@Injectable({
	providedIn: 'root',
})
export class SuccessService {
	constructor(private notification: NzNotificationService) {}

	ResponseMessage(type: string, message: string): void {
		this.notification.create(
			type,
			type === 'success' ? 'Success' : 'Error',
			message
		);
	}
}
