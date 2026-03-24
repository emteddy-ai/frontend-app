interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Order {
    id: string;
    userId: string;
    products: Array<{
        productId: string;
        quantity: number;
    }>;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

type PaginatedResponse<T> = ApiResponse<T[]> & {
    page: number;
    limit: number;
    total: number;
};

export { User, Product, Order, ApiResponse, PaginatedResponse };