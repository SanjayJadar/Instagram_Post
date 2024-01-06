import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {

  const [values, setValues] = useState([]);
  const [avilable, setAvilable] = useState(true);
  let userData = localStorage.getItem('data'); 
  const navigate = useNavigate()

  useEffect(()=>{
      const fetchData = async () => {
          try {
            const apiData = await axios.get(`https://instagram-post.onrender.com/post/data/${userData}`);
            let values = apiData.data;
            setValues(values);
            if(values.length==0){
              setAvilable(false); 
            } 
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
      await axios.delete(`https://instagram-post.onrender.com/post/delete/${item}`);
      navigate('/');
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
            { avilable ?
              (
                values.length!==0 ? 
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
                <div className='placeholder-box flex flex-col items-center justify-center'>
                      {/* Empty box as a placeholder */}
                    {Array.from({ length: 5 }, (_, index) => (
                      <div key={index} className='w-96 h-96 bg-gray-300 m-8'></div>
                    ))}
                    <div className='m-8'>Loading...</div>
                </div>
              )
              : 
              (<div className='m-20'>Not Yet Posted</div>)
            }
        </div>
    </div>
  )
          
}
