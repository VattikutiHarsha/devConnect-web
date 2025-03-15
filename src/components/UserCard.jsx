import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) {
    return <p>No new users found!</p>;
  }
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true});
      console.log(res);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log("ERROR: ", err.message);
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl} 
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName }</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
  )
};

// Add prop validation
UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    about: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
};

export default UserCard;