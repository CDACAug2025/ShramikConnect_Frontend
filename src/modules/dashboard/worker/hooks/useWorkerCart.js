import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const useWorkerCart = () => {
    // Initialize cart from localStorage to maintain state across pages
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('worker_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('worker_cart', JSON.stringify(cart));
        const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        setTotalAmount(total);
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.productId === product.productId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === product.productId ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prevCart, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.productId !== productId));
    };

    const handleCheckout = async (address) => {
    try {
        const res = await axiosInstance.post('/worker/orders/create', {
            totalAmount,
            items: cart,
            address: address 
        });

        // Robust parsing: If res.data is already an object, use it. 
        // If it's a string, parse it once.
        let rzpData = res.data;
        if (typeof rzpData === 'string') {
            try {
                rzpData = JSON.parse(rzpData);
            } catch (e) {
                console.error("Failed to parse backend response string:", rzpData);
                throw new Error("Invalid response format from server");
            }
        }

        if (!rzpData || !rzpData.id) {
            console.error("Missing Order ID in response:", rzpData);
            alert("Server failed to generate a valid Razorpay Order ID.");
            return;
        }

        const options = {
            key: "rzp_test_SAWUs3cxm7J6XZ", 
            amount: rzpData.amount,
            currency: rzpData.currency,
            name: "Shramik Connect",
            description: "Equipment Purchase",
            order_id: rzpData.id, // This is the 'id' from Razorpay
            handler: async (response) => {
                await axiosInstance.post('/worker/orders/verify', response);
                setCart([]); 
                localStorage.removeItem('worker_cart');
                navigate('/worker/my-orders');
            },
            theme: { color: "#ffc107" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (err) {
        console.error("Payment initiation failed:", err);
        // Display actual backend error message if available
        const msg = err.response?.data?.message || err.message;
        alert("Checkout Error: " + msg);
    }
};

    return { cart, addToCart, totalAmount, removeFromCart, handleCheckout };
};