export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;
  roles?: string[];
  profileImageUrl?: string;
}
export interface UserAvatar {
  id?: string;
  profileImageUrl: string;
}
