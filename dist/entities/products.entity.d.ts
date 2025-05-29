import { OrderDetails } from "./orderDetails.entity";
import { Categories } from "./categories.entity";
import { Files } from "./files.entity";
export declare class Products {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: string;
    imgUrl: string;
    files: Files[];
    categories: Categories;
    orderDetails: OrderDetails[];
}
