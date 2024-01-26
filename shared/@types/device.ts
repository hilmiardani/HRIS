export interface Device {
  id: string;
  fingerprint: string;
  deviceToken: string;
  fcmToken?: string;
  fcmTokenLastUpdate?: Date;
  lastActive?: Date;
  createdAt?: Date;
}
