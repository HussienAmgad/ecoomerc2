import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProductIdContext } from '../Context/ProductDetails'; // تأكد من أن الاستيراد صحيح
import { HashLoader } from 'react-spinners';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductDetails() {
  const navigate = useNavigate(); // تعريف useNavigate
  const [productDetails, setProductDetails] = useState(null); // استخدم اسم مفيد
  const { productId } = useContext(ProductIdContext); // تأكد من استخدام اسم صحيح

  async function getProductDetails() {
    if (!productId) { // تحقق مما إذا كان productId غير موجود
      navigate("/products"); // توجيه المستخدم إلى صفحة المنتجات
      return; // توقف عن التنفيذ إذا لم يكن productId موجودًا
    }
    
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setProductDetails(data.data); // تأكد من أن البيانات هي ما تحتاجه
      console.log(data.data); 
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  }

  useEffect(() => {
    getProductDetails(); // استدعاء الدالة عند تحميل المكون
  }, [productId]);

  return (
    <div className="max-w-4xl mx-auto p-4"> {/* حدد العرض الأقصى والتوسيع */}
      {productDetails ? (
        <div>
          <h1 className='text-3xl font-bold text-center mt-4'>{productDetails.title}</h1>
          <Swiper
            pagination={{ clickable: true }}
            navigation
            modules={[Navigation, Pagination]}
            spaceBetween={20} // Space between slides
            slidesPerView={1} // Default number of slides
            loop={true}
            className='w-full h-auto mt-4' // إضافة هامش أعلى
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
          >
            {productDetails.images && productDetails.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className='w-full h-[500px] flex justify-center items-center'>
                  <img src={image} alt={productDetails.title} className='w-full h-full rounded-lg shadow-lg' /> {/* إضافة الشكل والظل للصورة */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className='mt-4 text-lg text-gray-700'>{productDetails.description}</p> {/* تعديل نص الوصف */}
          <p className='mt-2 text-xl font-bold text-green-600'>Price: {productDetails.price} LE</p> {/* إضافة لون للنص */}
        </div>
      ) : (
        <div className='flex justify-center items-center h-full'>
          <HashLoader color="#5a9aa0" />
        </div>
      )}
    </div>
  );
}
