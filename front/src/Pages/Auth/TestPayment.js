import axios from 'axios';
import React, { useState } from 'react'

function TestPayment() {
    const [paymentUrl, setPaymentUrl] = useState('');

    const Products = [
      {
        "title": "Anime",
        "productId": "prod_QU9J2fgTQiD910",
        "price": "14.90 USD",
        "priceId": "price_1PdB1CBvSAszwErDIsP3zHlw"
      },
      {
        "title": "All",
        "productId": "prod_QU9JVmiTsk9XsF",
        "price": "19.90 USD",
        "priceId": "price_1PdB0tBvSAszwErDKd5AnIJH"
      },
    ]

    const handlePayment = async (key) => {
      console.log({
        productId: Products[key].productId,
        priceId: Products[key].priceId
      });
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
          throw new Error('Payment URL not received');
        }
    
        window.location.href = data.paymenturl; // Redirect to the payment URL
    
      } catch (error) {
        console.error('Failed to fetch payment link:', error);
        // Handle errors or show an error message to the user
      }
    };
    

      

  return (
    <div className='space-x-4'>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentUrl && <a href={paymentUrl}>Proceed to Payment</a>}

      {Products.map((item,key)=>(
        <button key={key} onClick={()=> handlePayment(key)} className='bg-red-600 px-6 py-2'>
          {item.title}
        </button>
      ))}

    </div>
  )
}

export default TestPayment