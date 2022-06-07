import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = ({authUser,setCategory}) => {

  const handleClick = (type) => {
    setCategory(type)
  }

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark my-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">BooksForAll</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                    <li className="nav-item">
                    <Link to="/about" className="nav-link active" aria-current="page">About</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page">Books</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/add" className="nav-link active" aria-current="page">Add Book</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle active" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li onClick={() => handleClick("Applied Science")}><NavLink to="/category"  className="dropdown-item" href="/">Applied Science</NavLink></li>
                        <li onClick={() => handleClick("Civil Engineering")} ><NavLink to="/category" className="dropdown-item" href="/">Civil Engineering</NavLink></li>
                        <li onClick={() => handleClick("Computer Science & Engineering")} ><NavLink to="/category" className="dropdown-item" href="/">Computer Science & Engineering</NavLink></li>
                        <li onClick={() => handleClick("Electrical Engineering")} ><NavLink to="/category" className="dropdown-item" href="/">Electrical Engineering</NavLink></li>
                        <li onClick={() => handleClick("Electronics & Communication Engineering")} ><NavLink to="/category" className="dropdown-item" href="/">Electronics & Communication Engineering</NavLink></li>
                        <li onClick={() => handleClick("Information Technology")} ><NavLink to="/category" className="dropdown-item" href="/">Information Technology</NavLink></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li onClick={() => handleClick("Others")} ><NavLink to="/category" className="dropdown-item" href="/">Others</NavLink></li>
                      </ul>
                    </li>
                </ul>
                { !authUser ?  <>
                <button type="button" className="btn btn-outline-light mx-2"><NavLink to="/register" className="signin-btn">Sign Up</NavLink></button>
                <button type="button" className="btn btn-outline-light mx-2"><NavLink to="/login" className="signin-btn">Sign in</NavLink></button> 
                <button type="button" className="btn btn-outline-light mx-2"><NavLink to="/forgotpassword" className="signin-btn">Forgot Password</NavLink></button> 

                </>
                :<button type="button" onClick={() => {
                  localStorage.removeItem('user')
                  window.location.reload();
                }} className="btn btn-outline-light mx-2"><NavLink to="/" className="signin-btn">Log out</NavLink></button>  }

                </div>
            </div>
            </nav>
    </>
  )
}

export default Navbar