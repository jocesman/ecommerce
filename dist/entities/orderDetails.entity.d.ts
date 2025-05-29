import { Orders } from "./orders.entity";
import { Products } from "./products.entity";
export declare class OrderDetails {
    id: string;
    price: string;
    orders: Orders;
    products: Products[];
}
