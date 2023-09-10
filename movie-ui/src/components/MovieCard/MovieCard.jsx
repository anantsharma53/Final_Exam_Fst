import { Card } from 'primereact/card'
import './MovieCard.css'
import StarRating from '../StarRating/StarRating'


const MovieCard = ({ movie }) => {
  // const header = <img alt="" src={movie.image} className="img-fluid" style={{width:'400px',height:'500px'}}/>;
  const header = (
    <img
      alt=""
      src={movie.image}
      className="img-fluid zoom-out-image" // Add a class for styling
      style={{
        width: '400px',
        height: '500px',
        transition: 'transform 0.2s', // Smooth transition over 0.2 seconds
        borderRadius: '10px'
      }}
      onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')} // Zoom out by 10% on hover
      onMouseOut={(e) => (e.target.style.transform = 'scale(1)')} // Reset to normal size when not hovering
    />
  );
  const cardStyles = {
    // backgroundColor: 'white', // Set the desired background color
    border: '0px solid #ddd', // Add a border for a clean look
    // borderRadius: '5px', // Add border radius
    // padding: '1rem' // Add padding to the card content
    backgroundColor: 'black',
    // opacity: '0.5',
    borderRadius: '15px'
  };

  return (
    <div className="p-col-12 p-md-4">
      <Card title={movie.title} subTitle={`Rating: ${movie.rating}`} header={header} style={cardStyles}>
        <div className="content">
          {/* <hr /> */}
          {/* Include the StarRating component */}
          <StarRating rating={movie.rating} />
        </div>
      </Card>
    </div>
  );
};

export default MovieCard;