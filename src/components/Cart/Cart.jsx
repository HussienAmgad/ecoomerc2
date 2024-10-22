// Cart.js
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { ClearCart, createCheckoutSession, LoadCart, RemoveItem } from '../Utils/Utils';

export default function Cart() {
  const [cart, setCart] = useState({}); // لاحظ استخدام "cart" بدلاً من "Cart" لتجنب التباس الأسماء
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the cart data when the component mounts
    LoadCart(setCart, setLoading); // استخدم LoadCart بدلاً من LoadCartinf

  }, []);

  // Clear cart function
  const handleClearCart = async () => {
    await ClearCart(setCart); // استخدم ClearCart بدلاً من ClearCartinf
  };
  
  const Checkout = async () => {
    try {
      const sessionData = await createCheckoutSession();
      // يمكنك التعامل مع sessionData كما تحتاج، مثل توجيه المستخدم إلى صفحة الدفع
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    }
  };

  // Remove item function
  const handleRemoveItem = async (id) => {
    await RemoveItem(id, setCart); // استخدم RemoveItem بدلاً من RemoveIteminf
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Your Cart</h1>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <HashLoader color="#5a9aa0" />
          </div>
        ) : (
          /* Check if there are products in the cart */
          cart.data?.products && cart.data.products.length > 0 ? (
            <>
              <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">Total: {cart.data.totalCartPrice} LE</h3>
                  <button 
                    onClick={Checkout} 
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Proceed to Checkout
                  </button>
                  <button 
                    onClick={handleClearCart} 
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {cart.data.products.map((item) => (
                  <div key={item._id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-full rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.product.title}</h2>
                    <p className="text-gray-600 mb-4">Quantity: {item.count}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">{item.price} LE</span>
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors duration-300"
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-gray-600">Your cart is empty</h2>
              <p className="text-gray-500 mt-4">Start adding some products to your cart!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
