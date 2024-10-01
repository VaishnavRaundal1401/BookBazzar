import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { useSelector } from 'react-redux';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    
    const {id} = useParams();
    const [Data, setData] = useState();
    useEffect(() => {
      const fetch = async () =>{
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
    };
      fetch();
    }, []);

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
    } 
    //handle favourites
    const handleFavourites = async() => {
      const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite", {}, {headers});
      alert(response.data.message);
    }

    //handle cart
    const handleCart = async() =>{
      const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", {}, {headers});
      alert(response.data.message);
    }
  return (
    <>
      {Data && (
          <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row lg:flex-row gap-8'>
            <div className='w-full lg:w-3/6'> 
              <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded'>
                <img src={Data.url} alt='/' className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded'/>
                {isLoggedIn === true && role === "user" && (
                  <div className='flex flex-row lg:flex-col mt-4 lg:mt-0 items-center justify-between lg:justify-start'>
                    <button className='text-red-600 hover:bg-red-100 transition-all duration-[0.75s] rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8' onClick={handleFavourites}><FaHeart /></button>
                    <button className='text-blue-600 hover:bg-blue-100 transition-all duration-[0.75s] rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8' onClick={handleCart}><IoIosCart /></button>
                  </div>
                )}
                {isLoggedIn === true && role === "admin" && (
                  <div className='flex flex-row lg:flex-col mt-4 lg:mt-0 items-center justify-between lg:justify-start'>
                    <button className='text-blue-600 hover:bg-blue-100 transition-all duration-[0.75s] rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8'><FaUserEdit /></button>
                    <button className='text-red-600 hover:bg-red-100 transition-all duration-[0.75s] rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8'><MdDelete /></button>
                  </div>
                )}
              </div>
            </div>
            <div className='p-4 w-full lg:w-3/6'>
              <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
              <p className='text-zinc-400 mt-1'>by {Data.author}</p>
              <p className='text-zinc-500 mt-4'>{Data.desc}</p>
              <p className='flex mt-4 items-center justify-start text-zinc-400'><GrLanguage className='me-3'/>{Data.language}</p>
              <p className='mt-4 text-zinc-100 text-3xl font-semibold'> Price : $ {Data.price}{" "}</p>
            </div>
          </div>)}
        {!Data && <div className='bg-zinc-900 flex items-center justify-center py-4'><Loader/> {" "}</div> }
    </>
  )
}

export default ViewBookDetails
