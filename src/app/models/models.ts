import { AuthLevel, Category } from './enums';

export interface Iuser {
  id: string;
  userName: string;
  email: string;
  password: string;
  authLevel: AuthLevel;
  token: string;
  refreshToken: string;
}

export class LoginUserDTO {
  public email: string = '';
  public password: string = '';
}

export class UserRegisterDTO {
  public userName: string = '';
  public email: string = '';
  public password: string = '';
}

export class SectionInfo {
  title: string = '';
  data: Array<StoreItem> = [];
}

export class StoreItem {
  category: Category | undefined;
  id: number = 0;
  title: string = '';
  image: string = '';
  price: number = 0;
  sizes: Array<string> = [];
}

export class CartItem {
  id: number = 0;
  item: StoreItem = new StoreItem();
  size: string = 'Size';
  quantity: number = 0;
}

export class Order {
  id: number = 0;
  userId: string = '';
  storeItemId: number = 0;
  size: string = 'Size';
  quantity: number = 0;
  orderDate: Date = new Date();
  sent: boolean = false;
  deliveryDate: Date = new Date();
}
