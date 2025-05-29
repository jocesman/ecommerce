export type OrderDto = {
    userId: string;
    userName: string;
    createdAt: Date;
    orderId: string;
    order: string;
    price: number;
    productos: [
        {
            productId: string;
            productName: string;
        }
    ];
};
