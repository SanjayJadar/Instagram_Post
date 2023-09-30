import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {

  const [values, setValues] = useState([]);
  let userData = localStorage.getItem('data'); 

  useEffect(()=>{
      const fetchData = async () => {
          try {
            const apiData = await axios.get(`http://localhost:1000/post/data/${userData}`);
            setValues(apiData.data);
            // console.log(apiData.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
  },[])

  // Delete Post
  const onDelete = async(item) =>{
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if(confirmed){
      await axios.delete(`http://localhost:1000/post/delete/${item}`);
      window.location.reload();
    }
  }

  return (
    <div>
                {/* Home button  */}
        <Link to={'/'} type="button" class="mt-8 bg-blue-400 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-700 hover:text-white px-3 items-start mr-60">
          <div class="flex flex-row align-middle">
            <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <p class="ml-2">Home</p>
          </div>
        </Link>

        <div> 
            <h3 className='my-10 font-serif text-2xl'>Welcome {localStorage.getItem('data').toLocaleUpperCase()}</h3>
            <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' to={'/newpost'}>New Post</Link>
        </div>
        <div>
            {values.length!==0 ? 
                values.map((item, index)=>{
                  return (
                    <div key={index}>



                        <img className='block ml-auto mr-auto object-cover w-96 mt-20' src={item.image} alt="post" />
                        <h4 className='my-4'>{item.tag}</h4>
                        <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline" onClick={()=>onDelete(item._id)}>Delete</Link>
                    </div>
                  )
                }) 
                :
                <div className='mt-16'>No Post Posted Yet</div> 
            }
        </div>
    </div>
  )
          
}
