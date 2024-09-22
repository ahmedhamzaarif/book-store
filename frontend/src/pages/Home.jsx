import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'
import { baseUrl } from '../services/baseUrl'

const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')
    
    useEffect(() => {
      setLoading(true)
      axios
      .get(`${baseUrl}/books/`)
      .then((response)=>{
        setBooks(response.data.data)
        // console.log(response.data.data)
        setLoading(false)
      })
      .catch((e)=>{
        console.error(e.message)
        setLoading(false)
      });
    }, [])
    
  return (
    <div className='p-4'>
        <div className="flex justify-end items-center gap-x-4">
            <button className='bg-sky-700 hover:bg-sky-600 px-4 py-1 rounded-lg text-white'
            onClick={()=> setShowType('table')}>
                Table
            </button>
            <button className='bg-sky-700 hover:bg-sky-600 px-4 py-1 rounded-lg text-white'
            onClick={()=> setShowType('card')}>
                Card
            </button>
        </div>
        <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">My Books List</h1>
            <Link to="/books/create">
                <MdOutlineAddBox className='text-sky-800 text-4xl'/>
            </Link>
        </div>
        {loading ? <Spinner/> : showType === 'table' ? ( <BooksTable books={books}/> ) : (<BooksCard books={books}/>)}
    </div>
  )
}

export default Home