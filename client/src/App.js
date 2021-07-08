import React, { useState, useEffect} from "react";
import './App.css';
import Axios from 'axios'

function App() {

  const [movieName, setMovieName]= useState('');
  const [review, setReview ]=useState('');
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data);
    });
  },[]);

  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert', {
      movie_name: movieName, 
      movie_review: review,
    }).then(()=>{
      alert ("Successful insert");
    });
  };

  return (
    <div className="App">
     <h1>CRUD APPLICATION</h1>
    <div className="form">
      <label>movie name: </label>
      <input type="text" name="movieName" onChange = {(e) => {
        setMovieName(e.target.value);
      }}/>
      <label>review: </label>
      <input type="text" name="review" onChange = {(e) => {
        setReview(e.target.value);
      }}/>

      <button onClick={submitReview}>Submit</button>

      {movieReviewList.map((val)=> {
        return <h1>MovieName: {val.movie_name} | Movie review: {val.movie_review} </h1>
      })}
    </div>
     
    </div>
  );
}

export default App;
