import StarRatings from "react-star-ratings";

export default function Rating({ rating }) {

  return (
  <StarRatings
    rating={rating}
    starEmptyColor="#d3d3d3"
    starRatedColor="#a67a0c"
    numberOfStars={5}
    name='rating'
    starDimension="40px"
  />
  );
}