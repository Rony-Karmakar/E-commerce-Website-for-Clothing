import React from 'react';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

const PreviousOrdersDetails = () => {

  const location = useLocation();
  const order = location.state;
  console.log(order);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Previous Orders</h2>

      <div key={order.id} className="bg-white shadow-md rounded-lg mb-6 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Order ID: {order.orderId}</h3>
          <span className="text-sm text-gray-500">
            Status: {order.orderStatus}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-medium">Order Date:</p>
            <p>{format(new Date(order.orderDate), 'PPP')}</p>
          </div>
          <div>
            <p className="font-medium">Delivery Date:</p>
            <p>{format(new Date(order.deliveryDate), 'PPP')}</p>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Shipping Address:</h4>
          <p>{order.orderAddress.firstName} {order.orderAddress.lastName}</p>
          <p>{order.orderAddress.streetAddress}</p>
          <p>{order.orderAddress.city}, {order.orderAddress.state} {order.orderAddress.zipCode}</p>
          <p>Phone: {order.orderAddress.mobile}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Order Items:</h4>
          <ul className="divide-y divide-gray-200">
            {order.orderItems.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <img src={item.product.imageUrl} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-500">Size: {item.size}, Quantity: {item.quantity}</p>
                    <p className="text-sm">
                      Price: ₹{item.discountedPrice}
                      <span className="line-through text-gray-500 ml-2">₹{item.price}</span>
                      <span className="text-green-500 ml-2">({item.product.discountPercent}% OFF)</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p className="font-medium">Total Items: {order.totalItem}</p>
            <p className="font-medium">Total Price: ₹{order.totalPrice}</p>
          </div>
          <div>
            <p className="font-medium text-green-600">
              Total Discounted Price: ₹{order.totalDiscountedPrice}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PreviousOrdersDetails;

