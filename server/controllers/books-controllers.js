const express = require("express");
const Book = require("../model/Book");
const Order = require("../model/Order")
const User = require("../model/User")
const stripe = require("stripe")(
  "sk_test_51L7iujFgj2yb4nANRcf9to7fenJCszkUzgb4OjBpOc6SxloKMIQoNMsQPCXywSktfy8WCry9FMIrstYfTh3I76jd00ZFejKLCc",{ apiVersion: '2020-08-27' }
);
const uuid = require("uuid/v4");



const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }
  if (!books) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ books });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

const addBook = async (req, res, next) => {
  const { name, author, department, description, price, phone, available, image, category } = req.body;
  let book;
  try {
    book = new Book({
      name,
      author,
      department,
      description,
      price,
      phone,
      available,
      image,
      category
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable to Add" });
  }
  return res.status(201).json({ book });
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, department, description, price, phone, available, image, category } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      department,
      description,
      price,
      phone,
      available,
      image,
      category
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable to Update by this ID" });
  }
  return res.status(201).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable to Delete by this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

const getByCategory = async (req, res, next) => {
  const category = req.params.category;
  let book;
  try {
    book = await Book.aggregate([
      {
        $match: {
          category: category
        }
      }
    ]);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

const purchaseBook = async (req, res) => {
  let status;
  let order;
  try {
    const { product, token , id} = req.body;
    const getUser = await User.findById({_id:id})
    console.log('getUser', getUser)
    order = new Order({
      userName:getUser.name,
      userEmail: getUser.email,
      bookName:product.name,
      bookCategory:product.category,
      price:product.price,
      bookImage:product.image,
    });
    const SaveOrder = await order.save()
    console.log('SaveOrder', SaveOrder)
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    if(SaveOrder){
      return res.status(200).json({ message: "Payment success" });
    }

    const idempotency_key = uuid();
    
    const charge = await stripe.charges.create({
      amount: product.price * 100,
      currency: "usd",
      customer: customer.id,
      recept_email: token.email,
      description: `Purchased the ${product.name}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          postal_code: token.card.address_zip
        }
      }
    },
    idempotency_key
    );
    console.log("charrge: ",{charge})
    status = "success"
    res.status(200).json({ message: "Payment success" });
  } catch (error) {
    console.log("error",error)
    status = "failure"
    
  }
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.getByCategory = getByCategory;
exports.purchaseBook = purchaseBook;