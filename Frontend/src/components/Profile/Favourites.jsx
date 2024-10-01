import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books", {headers});
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [favouriteBooks])
  
  return (
    <>
      { favouriteBooks && favouriteBooks.length === 0 && (
        <div className='text-5xl text-zinc-500 font-semibold flex items-center justify-center w-full'>
          No Favourite Books
        </div>
      )}

      <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
        {favouriteBooks && favouriteBooks.map((item, id) => (
          <div key = {id}>
            <BookCard data={item} favourite = {true}/>
          </div>
        ))}
      </div>
    </> 
  )
}

export default Favourites
