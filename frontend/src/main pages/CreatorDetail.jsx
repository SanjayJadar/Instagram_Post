import React, { useEffect, useState } from 'react';
import { useLocation , Link} from 'react-router-dom';
import axios from 'axios';

export default function CreatorDetail() {

    const location = useLocation();
    const [values, setValues] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const apiData = await axios.get(`http://localhost:1000/post/data/${location.state.username}`);
              let values = apiData.data;
              setValues(values.reverse());
              console.log(apiData.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
        
          fetchData();
    },[])


  return (
    <div>
          {/* Home button  */}
          <Link to={'/creators'} type="button" class="mt-8 bg-blue-400 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-700 hover:text-white px-3 items-start mr-60">
          <div class="flex flex-row align-middle">
            <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <p class="ml-2">Back</p>
          </div>
        </Link>

        {values.length!==0 ? 
            values.reverse().map((item, index)=>{
              return (
                <div key={index}>
                    <img className='block ml-auto mr-auto object-cover w-96 mt-20' src={item.image} alt="post" />
                    <h4>{item.tag}</h4>
                </div>
              )
            }) 
            :
            <div>No Post Posted Yet</div> 
        }
    </div>
  )
}
