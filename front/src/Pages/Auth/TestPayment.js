import React, { useState } from 'react'

function TestPayment() {
    const [paymentUrl, setPaymentUrl] = useState('');

    const handlePayment = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/v1/payments/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          window.location.href = data.paymenturl;
        } catch (error) {
          console.error('Failed to fetch payment link:', error);
        }
      };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentUrl && <a href={paymentUrl}>Proceed to Payment</a>}
    </div>
  )
}

export default TestPayment