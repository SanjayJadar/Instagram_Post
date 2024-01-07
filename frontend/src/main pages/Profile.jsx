import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Placeholder from '../Components/Placeholder';

export default function Profile() {

  const [values, setValues] = useState([]);
  const [showImages, setshowImages] = useState([]);
  const [avilable, setAvilable] = useState(true);
  let userData = localStorage.getItem('username'); 
  const navigate = useNavigate()

      // Fetch Api Data
    const fetchData = async () => {
      try {
        const apiData = await axios.get(`https://instagram-post.onrender.com/post/data/${userData}`);
        let value = await apiData.data;
        if(value.length===0){
          setAvilable(false);
        }
        setshowImages(value.splice(0,5));  
        setValues(value); 
      } catch (error) { 
        console.error('Error fetching data:', error);
      }
    };

    // Load More Data 
    const loadmoredata = async()=>{
      const value = values.splice(0,5);
      setshowImages((prev)=>[...prev, ...value]); 
    } 

  useEffect(()=>{
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
        <Link to={'/'} type="button" className="mt-8 bg-blue-400 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-700 hover:text-white px-3 items-start mr-60">
          <div className="flex flex-row align-middle">
            <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg> 
            <p className="ml-2">Home</p>
          </div>
        </Link>

        <div> 
            <h3 className='my-10 font-serif text-2xl'>Welcome {localStorage.getItem('username')}</h3>
            <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' to={'/newpost'}>New Post</Link>
        </div>
        <div>

              {/* Show User Profile Details  */}

            { avilable ? 
             
                showImages.length!==0 ? 
                  <div>
                    {/* Posts Display (Display Data)    */}
                    {showImages.map((item, index)=>{
                      return (
                        <div key={index}>
                          <img className='block ml-auto mr-auto object-cover w-96 mt-20' src={item.image} alt="post" />
                          <h4 className='block ml-auto mr-auto w-80 my-4'>{item.tag}</h4>
                          <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline" onClick={()=>onDelete(item._id)}>Delete</Link>
                        </div>
                    )
                    })}

                    {/* Load More Data  */}
                    {values.length!==0 
                      ?
                      <button className='m-16 p-2 rounded-lg text-slate-600 bg-slate-100' onClick={loadmoredata}>Load more</button>
                      : 
                      <div>
                        <p className='mt-16'>No more data</p>
                        <button className='mb-16 mt-2 p-2 rounded-lg text-slate-600 bg-slate-100' onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}}>Scroll to Top</button>
                      </div>
                    } 
                  </div>
                :
                    // Show empty boxes before while loading data 
                 <Placeholder/>
              
              : 

              <div className='m-20'>Not Yet Posted</div>
            }
        </div>
    </div>
  )
          
}
