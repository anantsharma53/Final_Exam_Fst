import React, { useState } from 'react';
import './PaymentModal.css'
import { useNavigate } from "react-router-dom";
import Loader from './../Loader/Loader';
function PaymentModal({ isOpen, onClose, onPaymentDone,selectedSeats, movie }) {
    const token=localStorage.getItem('token')
    const [paymentKey, setPaymentKey] = useState('');
    const[bookingDetails,setBookingDetails]=useState()
    const[loaderpage,setLoader]=useState(false)
    const[cvv,setCvv]=useState();
    const navigate = useNavigate()
    const handlePaymentDone = () => {

        // Simulate a payment process, and generate a payment key (you can replace this logic with actual payment integration)
        const generatedKey = cvv; // Replace with your payment processing logic

        // Set the payment key
        setPaymentKey(generatedKey);

        // Notify the calling component that payment is done
        onPaymentDone(generatedKey);
    };
    function handleBookSeats  () {
        setLoader(true)
        fetch(`http://127.0.0.1:8000/api/movies/seatbooking/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            seats: selectedSeats.map((seat) => seat.id),
            movie: movie,
          }),
        })
          .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
              throw new Error('Server error:', response.status);
            }
          })
          .then((data) => {
            setBookingDetails(data);
            console.log(data);
            
            handlePaymentDone()
            navigate('/dashboard')
            // Redirect to the dashboard or another page after successful booking.
          })
          .catch((error) => {
            // Handle any other errors that might occur.
            console.error('Error booking seats:', error);
          })
          .finally(() => {
            setLoader(false); // This ensures that loader is turned off regardless of success or error
        });
      };
    
    return (
        <>
        {loaderpage ? <Loader/> 
        :(
            <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                
                            <div class="card rounded-3">
                                <div class="card-body p-4">
                                    <div class="text-center mb-4">
                                        
                                        <h6>Fill Payment Details</h6>
                                    </div>
                                    <form action="">
                                        <p class="fw-bold mb-4 pb-2">Saved cards:</p>

                                        <div class="d-flex flex-row align-items-center mb-4 pb-1">
                                            <img class="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                                            <div class="flex-fill mx-3">
                                                <div class="form-outline">
                                                    <input type="text" id="formControlLgXc" class="form-control form-control-lg form-control-black"
                                                        value="**** **** **** 3193" />
                                                    <label class="form-label" for="formControlLgXc">Card Number</label>
                                                </div>
                                            </div>
                                            <a href="#!">Remove card</a>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4 pb-1">
                                            <img class="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" />
                                            <div class="flex-fill mx-3">
                                                <div class="form-outline">
                                                    <input type="text" id="formControlLgXs" class="form-control form-control-lg form-control-black"
                                                        value="**** **** **** 4296" />
                                                    <label class="form-label" for="formControlLgXs">Card Number</label>
                                                </div>
                                            </div>
                                            <a href="#!">Remove card</a>
                                        </div>

                                        <p class="fw-bold mb-4">Add new card:</p>

                                        <div class="form-outline mb-4">
                                            <input type="text" id="formControlLgXsd" class="form-control" placeholder='Name as Per Card'
                                                 />
                                            <label class="form-label" for="formControlLgXsd">Cardholder's Name</label>
                                        </div>

                                        <div class="row mb-4">
                                            <div class="col-7">
                                                <div class="form-outline">
                                                    <input type="text" id="formControlLgXM" class="form-control" placeholder='1234 5678 1234 5678'
                                                        value="" />
                                                    <label class="form-label" for="formControlLgXM">Card Number</label>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="form-outline">
                                                    <input type="password" id="formControlLgExpk" class="form-control"
                                                        placeholder="MM/YYYY" />
                                                    <label class="form-label" for="formControlLgExpk">Expire</label>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="form-outline">
                                                    <input type="password" id="formControlLgcvv" class="form-control"
                                                        placeholder="C V V"
                                                        value={cvv}
                                                        onChange={(e) => setCvv(e.target.value)} />
                                                    <label class="form-label" for="formControlLgcvv">C V V</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <button class="btn btn-success btn-lg btn-block">Add card</button> */}
                                        {cvv?<button class="btn btn-success btn-lg btn-block" onClick={handleBookSeats}>Confirm Payment</button>:
                                        <button class="btn btn-success btn-lg btn-block"onClick={handlePaymentDone} disabled>Cancel</button>}

                                        <button class="btn btn-success btn-lg btn-block" onClick={onClose}>Cancel</button>
                                    </form>
                                </div>
                            </div>                      
            </div>
        </div>)}
        </>
    );
}

export default PaymentModal;
