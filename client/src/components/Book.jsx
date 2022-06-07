import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";
const Book = (props) => {
  const history = useNavigate();
  const { _id, name, author, description, price, image } = props.book;
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/books/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/books"));
  };

  let getToke = localStorage.getItem('user');
  if(getToke) {
  getToke = JSON.parse(getToke)
  }

  return (
    <Link className="update-book" style={{textDecoration: 'none'}} to={`/books/${_id}`}>
    <div className="card">
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h3>₹ {price}</h3>
      { getToke?.email === 'admin@mail.com' && 
      <>
      <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
      </>
      }
    </div>
    </Link>
  );
};

export default Book;