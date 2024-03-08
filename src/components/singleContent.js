
import { Link } from "react-router-dom";
import { img_300 } from "../config/config";
import '../singleContent.css';

const SingleContent = ({ id, poster, title, date, media_type, vote_average }) => {

  const formattedVoteAverage = Math.floor(vote_average);
  const badgeColor = formattedVoteAverage > 6 ? "bg-primary" : "bg-danger";

  return (
    <Link to={`/moviedetails/${id}`} className="card-link" style={{listStyle: "none", textDecoration: "none", color:"#000"}}>
    <div className="card mt-4 single-content-card shadow-sm">
      <img className="card-img-top" src={`${img_300}/${poster}`} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          <span className={`badge position-absolute top-0 start-0 translate-middle ${badgeColor} p-2`}>
            {formattedVoteAverage}
          </span>
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="text-muted ms-2">{date}</span>
        </p>
      </div>
    </div>
    </Link>
  );
};

export default SingleContent;
