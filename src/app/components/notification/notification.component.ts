import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from "rxjs";

export enum NotificationType {
  Error,
  Success,
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  protected readonly NotificationType = NotificationType;

  public isDeleted: boolean = false;

  @Input() kind: NotificationType = NotificationType.Success;
  @Input() message: string = '';

  @Output() deleted: Observable<void> = new EventEmitter<void>();


  public async remove(): Promise<void> {
    this.isDeleted = true;
    (this.deleted as EventEmitter<void>).next();
  }

  public get title(): Observable<string> {
    return of(this.kind === NotificationType.Success ? "Success" : "Error");
  }
}
