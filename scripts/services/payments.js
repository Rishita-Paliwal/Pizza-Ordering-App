
var options = {
    "key": "rzp_test_clw9R68ExNXZyU", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits.
    "currency": "INR",
    "name": "Pizza Mania", //your business name
    "description": " Pizza Mania Test Transaction",
    "image": "https://example.com/your_logo",
    
    "handler": function (response){
        alert("Payment Successful")
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Customer Name", //your customer's name
        "email": "customer@gmail.com" 
      //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
    alerrt("Payment Failed")
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
document.getElementById('rzp-button1').addEventListener('click',function(){
    rzp1.open();
    e.preventDefault();
});
