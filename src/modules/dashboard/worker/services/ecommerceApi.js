import axiosInstance from '@/services/axiosInstance';

export const createRazorpayOrder = async (orderData) => {
    // orderData: { totalAmount, items: [{ productId, qty }] }
    const response = await axiosInstance.post('/worker/orders/create', orderData);
    return response.data;
};

export const verifyOrderPayment = async (paymentResponse) => {
    const response = await axiosInstance.post('/worker/orders/verify', paymentResponse);
    return response.data;
};