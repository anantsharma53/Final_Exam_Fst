import React from 'react';
import "./StarRating.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar, faStar as emptyStar } from '@fortawesome/free-solid-svg-icons';

// const StarRating = ({ rating }) => {
//   const starWidth = (rating / 5) * 100; // Convert rating to percentage
  
//   return (
//     <div className="star-rating">
//       <div className="star-rating-inner" style={{ width: `${starWidth}%` }}>
//         ★★★★★
//       </div>
//     </div>
//   );
// };
// export default StarRating;
// const StarRating = ({ rating }) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating - fullStars >= 0.5;
    
//     return (
//       <div className="star-rating">
//         {/* Full Stars */}
//         {Array.from({ length: fullStars }, (_, index) => (
//           <span key={index} className="star">★</span>
//         ))}
//         {/* Half Star */}
//         {hasHalfStar && <span className="star">★</span>}
//         {/* Empty Stars */}
//         {Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => (
//           <span key={index} className="star">☆</span>
//         ))}
//       </div>
//     );
//   };
  
//   export default StarRating;
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="star-rating">
      {/* Full Stars */}
      {Array.from({ length: fullStars }, (_, index) => (
        <FontAwesomeIcon key={index} icon={solidStar} className="star" />
      ))}
      {/* Half Star */}
      {hasHalfStar && <FontAwesomeIcon icon={halfStar} className="star" />}
      {/* Empty Stars */}
      {Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => (
        <FontAwesomeIcon key={index} icon={emptyStar} className="star" />
      ))}
    </div>
  );
};

export default StarRating;