import React, { useState, useEffect } from "react";
import "./SeatLayout.css";
import PaymentModal from "../PaymentModal/PaymentModal";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
function SeatLayout(props) {
  console.log(props)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user_details'));
  const token = localStorage.getItem('token')
  const { theaterdetails } = props;
  console.log(theaterdetails);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentKey, setPaymentKey] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatboking, setSeatboking] = useState();
  // const [selectedShowDate, setSelectedShowDate] = useState();
  // const [reservedSeat, setReservedSeat] = useState([]);
  console.log(theaterdetails)
  const seats=theaterdetails.seats
  const movie_id=theaterdetails.movie
  console.log(seats)
  const handleSeatClick = (seat) => {
    if (!seat.is_reserved) {
      if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    } else {
      alert('This seat is already reserved.');
    }
  };
  console.log(selectedSeats)
  const handleOpenPaymentModal = () => {
    if (token) {
      setPaymentModalOpen(true);
    } else {
      navigate('/signin');
    }
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  const handlePaymentDone = (key) => {
    setPaymentKey(key);
    setPaymentModalOpen(false);
    if (key) {
      // Payment successful, navigate to the success page or dashboard
      // Example: navigate('/success');
      // handleBookSeats()
      navigate('/dashboard');
    } else {
      // Handle payment failure here if needed
    }
  };


  console.log(seatboking)
  return (
    <>
      <div>
        <h1>Seat Reservation</h1>
        <div className="seat-grid">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${seat.is_reserved ? 'reserved' : selectedSeats.includes(seat) ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.seat_number}
            </div>
          ))}
        </div>
        <button onClick={() => alert(`Selected Seats: ${selectedSeats.map((seat) => seat.id).join(', ')}`)}>
          Reserve Selected Seats
        </button>
      </div>


      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        onPaymentDone={handlePaymentDone}
        selectedSeats={selectedSeats}
        movie={movie_id}
      />
      {paymentKey &&

        <p>Payment Key: {paymentKey}</p>}
      {selectedSeats.length !== 0 ?
        // selectedSeats.length !== 0 && selectedShowDate && selectedShowTime ?

        <button class="btnBookTickets" onClick={handleOpenPaymentModal}>Make Pyment</button>

        // <button class="btnBookTickets" onClick={handleBookSeats}>Book Selected Seats</button>
        :
        <button class="btnBookTickets" disabled>Book Selected Seats</button>
      }

    </>
    
  );
}

export default SeatLayout;