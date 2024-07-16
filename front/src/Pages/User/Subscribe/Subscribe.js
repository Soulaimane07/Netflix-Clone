import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCloseOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Footer from '../../../Components.js/Footer';
import { FaAngleRight } from "react-icons/fa6";
import axios from 'axios';
import Spinner from '../../../Components.js/Spinner';


function Subscribe() {
    const Products = [
        {
          "title": "All",
          "productId": "prod_QU9JVmiTsk9XsF",
          "price": "5.00 USD",
          "priceId": "price_1PdB0tBvSAszwErDKd5AnIJH"
        },
        {
          "title": "Anime",
          "productId": "prod_QU9J2fgTQiD910",
          "price": "3.00 USD",
          "priceId": "price_1PdB1CBvSAszwErDIsP3zHlw"
        },
    ]

    const list = [
        {
            "title": "Experience Disney+ content in Arabic",
            "image": "../assets/images/subscribe/1.png"
        },
        {
            "title": "Exclusive originals",
            "image": "../assets/images/subscribe/2.png"
        },
        {
            "title": "Easy-to-use parental controls",
            "image": "../assets/images/subscribe/3.png"
        },
        {
            "title": "No ads or additional charges ",
            "image": "../assets/images/subscribe/4.png"
        },
        {
            "title": "Create up to 7 profiles",
            "image": "../assets/images/subscribe/5.png"
        },
        {
            "title": "Stream on up to 4 devices at once",
            "image": "../assets/images/subscribe/6.png"
        },
    ]

    const [product, setProduct] = useState(0)
    const [loading, setLoading] = useState(false)

    const handlePayment = async (key) => {
        setLoading(true)
        
        try {
          const response = await axios.post('http://localhost:8080/api/v1/payments/', {
            productId: Products[key].productId,
            priceId: Products[key].priceId
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          const data = response.data; // Axios response data is accessed through response.data
      
          if (!data.paymenturl) {
            setLoading(false)
            throw new Error('Payment URL not received');
          }
      
          window.location.href = data.paymenturl;
          setLoading(false)
        } catch (error) {
            console.error('Failed to fetch payment link:', error);
            setLoading(false)
        }
    };


  return (
    <>
        <div className='bg-primary min-h-screen '>
            <div className='flex items-center space-x-10 px-20 py-10'>
                <Link to={"/profile"} className=' opacity-80 hover:scale-110 hover:opacity-100 transition-all text-white flex items-center'>
                    <IoCloseOutline size={50} />
                </Link>
                <Link to="/">
                    <img src='../assets/images/disney-plus-logo.webp' className='w-20' alt="logo" />
                </Link>
            </div>

            <div  className='text-white  flex '>
                <div className='flex w-full   Sub' style={{ backgroundImage: `url(../assets/images/login-bg.jpg)`}}>
                    <div className='w-full SubscribeGrad pt-10'>
                        <h1 className=' bg-primary px-20 text-4xl font-medium'> Subscribe now and start streaming </h1>
                        <p className=' px-20 flex items-center space-x-2 opacity-60 pb-2- pt-10'> <FaCheck className='mr-2' /> Cancel anytime (effective at the end of your billing period)</p>
                        <div className=' overflow-hidden w-full  h-full  '>
                        </div>
                    </div>
                </div>
                <div className='w-full py-20 px-20'>
                    <div className='grid grid-cols-3 mb-16 gap-10'>
                        {list.map((item,key)=>(
                            <div key={key}>
                                <img className='w-20 mx-auto mb-4' src={item.image} alt='listItem' />
                                <p className='text-sm text-center opacity-90'>{item.title}</p>
                            </div>
                        ))}
                    </div>

                    <div className='flex items-center space-x-6'>
                        {Products.map((item,key)=> (
                            <button onClick={()=> setProduct(key)} key={key} className={`w-full border rounded-md py-4 flex justify-between transition-all ${key === product ? " opacity-100" : " opacity-40"}`}>
                                <h1 className='text-xl text-left px-6'>{item.title}</h1>
                                <p className='text-xl text-left px-6'>{item.price}</p>
                            </button>
                        ))}
                    </div>
                    <button onClick={()=> handlePayment(product)} className='bg-blue-600 mt-10 hover:scale-105 hover:bg-blue-500 w-full rounded-md py-4 text-lg font-medium flex justify-center space-x-4 items-center transition-all'>
                        {!loading ? <>Continue <FaAngleRight className='ml-4' /></> : <Spinner />}
                    </button>
                    
                    <ul className=' px-5 opacity-40 text-sm space-y-2 mt-10 list-disc'>
                        <li> When purchasing an annual subscription, the annual price is equivalent to 10 months of the monthly subscription price. </li>
                        <li>If you subscribe to Disney+, we will charge a recurring monthly or annual fee (or equivalent) to your stored payment method.</li>
                        <li>Cancellations must be received at least 24 hours before the end of the current billing period to be effective at the end of that period.  </li>
                        <li>No refunds or credits will be given for partial months or years (or equivalents), unless required by law.</li>
                    </ul>
                </div>
            </div>
        </div>

        <Footer />
    </>
  )
}

export default Subscribe