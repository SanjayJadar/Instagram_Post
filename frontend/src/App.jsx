import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Posts from './main pages/Posts';
import Profile from './main pages/Profile';
import Creators from './main pages/Creators';
import Login from './forms/Login';
import SignUp from './forms/SignUp';
import NewPost from './forms/NewPost';
import CreatorDetail from './main pages/CreatorDetail';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path='/' element={<Posts/>}/>
                <Route exact path='/profile' element={<Profile/>}/>
                <Route exact path='/creators' element={<Creators/>}/>
                <Route exact path='/creator/details' element={<CreatorDetail/>}/>

                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/signup' element={<SignUp/>}/>
                <Route exact path='/newpost' element={<NewPost/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
