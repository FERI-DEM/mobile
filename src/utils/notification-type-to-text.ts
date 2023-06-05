import {NotificationType} from "../types/common.types";

export const notificationTypeToText = new Map<NotificationType, string>([
    [NotificationType.REQUEST_TO_JOIN, 'Prošnja za pridružitev'],
])