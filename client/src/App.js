import React, { Fragment, useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import About from "./Pages/About";
import Books from "./Pages/Books";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AddBook from "./Pages/AddBook";
import BookInfo from "./components/BookInfo";
import Register from "./Pages/Register";
import Categoty from "./components/Categoty";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {

  const authUser = localStorage.getItem('user')


  const [category,setCategory] = useState("Others")

  return (
    <Fragment>
    <BrowserRouter>
      <div className="App">
        <Navbar  authUser={authUser} setCategory={setCategory} />
        <Routes>
          {/* <Route path='/' element={ < Home /> } exact /> */}
          <Route path='/about' element={ < About /> } exact />
          <Route path='/register' element={ < Register /> } exact />
          <Route path='/' element={ < Books /> } exact />
          <Route path='/books/:id' element={ <BookInfo /> } exact />
          <Route path='/login' element={ < Login /> } exact />
          <Route path='/add' element={ < AddBook /> } exact />
          <Route path="/category" element = {<Categoty category={category} /> } exact />
          <Route path="/forgotpassword" element = {<ForgotPassword /> } exact />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
    <ToastContainer />
    </Fragment>
  );
}

export default App;
