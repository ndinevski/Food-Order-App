export type Meal = {
    id: string,
    name: string,
    price: string,
    description: string,
    image: string,
    quantity: number,
};

export type CartRedux = {
    cart: Meal[],
    totalQuantity: number,
    totalPrice: number,
    isOpen: boolean,
    formIsOpen: boolean,
    formIsLoading: boolean,
};

export type Customer = {
    name: string,
    email: string,
    street: string,
    city: string,
    zip: string,
}

export type OrderItems = {
    cart: Meal[],
    totalQuantity: number,
}

export type Order = {
    items: OrderItems,
    customer: Customer,
}

