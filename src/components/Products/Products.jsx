import React, { useEffect, useState, useContext } from 'react';
import { LoadProducts, addProductToCart } from '../Utils/Utils'; // تأكد من مسار الاستيراد
import starsolid from '../../assets/star2.svg'; 
import starcolor from '../../assets/star.svg'; 
import starhalf from '../../assets/star-half.svg'; 
import { NavLink } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { ProductIdContext } from '../Context/ProductDetails'; 
import { ToastContainer } from 'react-toastify';

export default function Products() {
  let [Products, setProducts] = useState([]);
  let { setProductId } = useContext(ProductIdContext);

  useEffect(() => {
    LoadProducts(setProducts);
  }, []);

  function setIdFunction(productId) {
    setProductId(productId);
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <ToastContainer />
      {Products.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
          {Products.map(product => (
            <div key={product.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <NavLink to="/productdetails">
                <img
                  onClick={() => setIdFunction(product.id)}
                  className="p-8 rounded-t-lg"
                  src={product.imageCover}
                  alt="product image"
                />
              </NavLink>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.category.name}</h5>
                <h5 className="text-lg font-medium tracking-tight text-gray-700 dark:text-gray-200">{product.title}</h5>
                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="flex">
                    {Array.from({ length: 5 }, (_, index) => {
                      if (index < Math.floor(product.ratingsAverage)) {
                        return <img key={index} src={starcolor} className="w-4 h-4" alt="star" />;
                      } else if (index < product.ratingsAverage) {
                        return <img key={index} src={starhalf} className="w-4 h-4" alt="half star" />;
                      } else {
                        return <img key={index} src={starsolid} className="w-4 h-4" alt="star" />;
                      }
                    })}
                  </span>
                  <span className="ml-2">
                    <span className="bg-gray-200 text-gray-700 text-sm font-medium rounded-lg px-3 py-1.5">
                      {product.ratingsAverage.toFixed(1)}
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{product.price} LE</span>
                  <button onClick={() => addProductToCart(product.id)} className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600">Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center h-full'>
          <HashLoader color="#5a9aa0" />
        </div>
      )}
    </div>
  );
}
