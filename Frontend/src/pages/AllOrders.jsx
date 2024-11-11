// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import Loader from '../components/Loader/Loader';
// import { FaUserLarge } from "react-icons/fa6";
// import { Link } from 'react-router-dom';
// import { FaCheck } from "react-icons/fa";
// import { IoOpenOutline } from "react-icons/io5";
// import SeeUserData from './SeeUserData';

// const AllOrders = () => {
//   const [AllOrders, setAllOrders] = useState();
//   const [Options, setOptions] = useState(-1);
//   const [Values, setValues] = useState({status:""});
//   const [userDiv, setuserDiv] = useState("hidden");
//   const [userDivData, setuserDivData] = useState("hidden");
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };
//   useEffect(() => {
//     const fetch = async () =>{
//       const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", {headers});
//       setAllOrders(response.data.data);
//     }
//     fetch();
//   }, []);
  
//   const setOptionsButton = (i) =>{
//     setOptions(i);
//   }

//   const change = (e) =>{
//     const {value} = e.target;
//     setValues({status:value});
//   }

//   const submitChanges = async (i) =>{
//     const id = AllOrders[i]._id;
//     const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`, Values, {headers});
//     alert(response.data.message);
//   }

//   AllOrders && AllOrders.splice(AllOrders.length - 1, 1);
//   return (
//     <>
//       {!AllOrders && <div className='h-[100%] flex items-center justify-center'><Loader/></div> }
//       {AllOrders && AllOrders.length > 0 &&( 
//         <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//           <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 md-8'>All Orders</h1>
//           <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//             <div className='w-[3%]'>
//               <h1 className='text-center'>Sr.</h1>
//             </div>
//             <div className='w-[22%]'>
//               <h1 className=''>Books</h1>
//             </div>
//             <div className='w-[45%]'>
//               <h1 className=''>Description</h1>
//             </div>
//             <div className='w-[9%]'>
//               <h1 className=''>Price</h1>
//             </div>
//             <div className='w-[16%]'>
//               <h1 className=''>Status</h1>
//             </div>
//             <div className='w-none md:w-[5%] hidden md:block'>
//               <h1 className=''><FaUserLarge /></h1>
//             </div>
//           </div>
//           {AllOrders.map((item, i) =>(
//             <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer' key={i}>
//               <div className='w-[3%]'>
//                 <h1 className='text-center'>{i+1}</h1>
//               </div>
//               <div className='w-[40%] md:w-[22%]'>
//                 <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>{item.book.title}</Link>
//               </div>
//               <div className='w-0 md:w-[45%] hidden md:block'>
//                 <h1 className=''>{item.book.desc.slice(0,50)}...</h1>
//               </div>
//               <div className='w-[17%] md:w-[9%]'>
//                 <h1 className=''>{item.book.price}</h1>
//               </div>
//               <div className='w-[30%] md:w-[16%]'>
//                 <h1 className='font-semibold'>
//                   <button className='hover:scale-105 transition-all duration-300' onClick={()=>setOptionsButton(i)}>
//                     {item.status === "Order Placed"? (
//                       <div className='text-cyan-500'>{item.status}</div>
//                     ): item.status === "Out for Delivery" ? (
//                       <div className='text-green-900'>{item.status}</div>
//                     ): item.status === "Delivered"?(
//                       <div className='text-green-500'>{item.status}</div>
//                     ):(
//                       <div className='text-red-500'>{item.status}</div>) }
//                   </button>
//                   <div className={`${Options === i ? "flex": "hidden"} flex mt-4`}>
//                     <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>
//                       {[
//                         "Order Placed",
//                         "Out for Delivery",
//                         "Delivered",
//                         "Cancelled",
//                       ].map((item, i) =>(
//                         <option value={item} key={i}>{item}</option>
//                       ))}
//                     </select> 
//                     <button className='text-green-500 hover:text-pink-600 mx-2'
//                       onClick={() =>{
//                         setOptions(-1);
//                         submitChanges(i);
//                       }}
//                     >
//                       <FaCheck />
//                     </button>
//                   </div>
//                 </h1>
//               </div>
//               <div className='w-[10%] md:w-[5%]'>
//                 <button className='text-xl hover:text-orange-500'
//                   onClick={() =>{
//                     setuserDiv("fixed");
//                     setuserDivData(item.user);
//                   }}
//                 >
//                   <IoOpenOutline />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {userDivData && (
//         <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv}/>
//       )}
//     </>
//   )
// }

// export default AllOrders;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { FaUserAlt, FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", { headers });
        setAllOrders(response.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const handleSubmitChanges = async (index) => {
    const order = allOrders[index];
    if (order && order._id) {
      try {
        const response = await axios.put(`http://localhost:1000/api/v1/update-status/${order._id}`, values, { headers });
        alert(response.data.message);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const toggleOptions = (index) => {
    setOptions(index === options ? -1 : index);
  };

  const handleUserDiv = (user) => {
    setUserDiv("fixed");
    setUserDivData(user);
  };

  return (
    <>
      {!allOrders.length ? (
        <div className="h-[100%] flex items-center justify-center"><Loader /></div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 md-8">All Orders</h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]"><h1 className="text-center">Sr.</h1></div>
            <div className="w-[22%]"><h1>Books</h1></div>
            <div className="w-[45%]"><h1>Description</h1></div>
            <div className="w-[9%]"><h1>Price</h1></div>
            <div className="w-[16%]"><h1>Status</h1></div>
            <div className="w-none md:w-[5%] hidden md:block"><h1><FaUserAlt /></h1></div>
          </div>
          {allOrders.map((item, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer" key={item._id || i}>
              <div className="w-[3%]"><h1 className="text-center">{i + 1}</h1></div>
              <div className="w-[40%] md:w-[22%]">
                {item.book ? (
                  <Link to={`/view-book-details/${item.book._id}`} className="hover:text-blue-300">{item.book.title}</Link>
                ) : (
                  <span>Unknown Book</span>
                )}
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{item.book?.desc ? `${item.book.desc.slice(0, 50)}...` : "No Description"}</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1>{item.book?.price || "N/A"}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <button className="hover:scale-105 transition-all duration-300" onClick={() => toggleOptions(i)}>
                  <div className={item.status === "Order Placed" ? "text-cyan-500" : item.status === "Out for Delivery" ? "text-green-900" : item.status === "Delivered" ? "text-green-500" : "text-red-500"}>
                    {item.status || "No Status"}
                  </div>
                </button>
                {options === i && (
                  <div className="flex mt-4">
                    <select name="status" className="bg-gray-800" onChange={handleChange} value={values.status}>
                      {["Order Placed", "Out for Delivery", "Delivered", "Cancelled"].map((status, idx) => (
                        <option value={status} key={idx}>{status}</option>
                      ))}
                    </select>
                    <button className="text-green-500 hover:text-pink-600 mx-2" onClick={() => { toggleOptions(-1); handleSubmitChanges(i); }}>
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button className="text-xl hover:text-orange-500" onClick={() => handleUserDiv(item.user)}>
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData userDivData={userDivData} userDiv={userDiv} setUserDiv={setUserDiv} />
      )}
    </>
  );
};

export default AllOrders;
