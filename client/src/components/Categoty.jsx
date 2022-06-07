import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import Book from './Book'

const Categoty =  ({category}) => {

    const [ data , setData ] = useState([])

    useEffect(() => {
        getData()
    },[category])

    const getData = async() => {
        try {
            const response = await axios.get(`books/category/${category}`)
            if(response?.status === 200) {
                setData(response?.data?.book)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

  return (
    <ul>
      {data && data.map((book,i)=>(
        <li className='book-li' key={i}>
          <Book book={book} />
        </li>
      ))}
    </ul>
  )
}

export default Categoty