import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { category } from "../utils/constant";
import './addbooks.css'


const AddBook = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    department: "",
    price: "",
    phone: "",
    author: "",
    image: "",
    category:''
  });
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name, "Value", e.target.value);
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/books", {
        name: String(inputs.name),
        author: String(inputs.author),
        department: String(inputs.department),
        description: String(inputs.description),
        price: Number(inputs.price),
        phone: Number(inputs.phone),
        image: String(inputs.image),
        category:String(inputs.category),
        available: Boolean(checked),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, checked);
    sendRequest().then(() => history("/books"));
  };

  return (
    <>
    <center><h2>Add a book</h2></center>
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
      >
        <TextField
        label="Name"
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />
        <TextField
        label="Author"
          value={inputs.author}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="author"
        />
        <TextField
          value={inputs.department}
          onChange={handleChange}
          label="Department"
          margin="normal"
          fullWidth
          variant="outlined"
          name="department"
        />
        <TextField
          value={inputs.description}
          label="Description"
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <TextField
          value={inputs.price}
          label="price"
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
        />
        <TextField
          value={inputs.phone}
          onChange={handleChange}
          type="number"
          label="phone"
          margin="normal"
          fullWidth
          variant="outlined"
          name="phone"
        />
        <TextField
          value={inputs.image}
    label="Image (URL)"

          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="image"
        />

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Department</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={inputs.category}
    label="Category"
    name="category"
    onChange={handleChange}
  >
    {
      category?.map((item) => {
       return <MenuItem value={item} key={item}>{item}</MenuItem>
      })
    }
  </Select>
</FormControl>


        {/*  <FormLabel>Category</FormLabel>
        <TextField
          value={inputs.category}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="category"
        /> */}
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Available"
        />

        <Button className="addbook-button" variant="contained" type="submit">
          Add Book
        </Button>
      </Box>
    </form>
    </>
  );
};

export default AddBook;