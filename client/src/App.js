import React, { useState, useEffect} from "react";
import './App.css';
import Axios from 'axios'

function App() {

  const [movieName, setMovieName]= useState('');
  const [review, setReview ]=useState('');
  const [movieReviewList, setMovieList] = useState([]);
  
  const [newReview, setNewReview] = useState("");

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data);
    });
  },[]);

  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert', {
      movie_name: movieName, 
      movie_review: review,
    });

    setMovieList([
      ...movieReviewList,
      {movie_name: movieName, movie_review: review},
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movie_name: movie,
      movie_review: newReview,
    });
    setNewReview("")
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
          return (
            <div className="card">
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>

              <button onClick={() => {deleteReview(val.movie_name)}}> Delete</button>
              <input type="text" id="updateInput" onChange={(e)=>{
                setNewReview(e.target.value)
              }}/>
              <button onClick={()=> {updateReview(val.movie_name)}}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
