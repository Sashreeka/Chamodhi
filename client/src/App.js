import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
     <h1>CRUD APPLICATION</h1>
    <div className="form">
      <label>movie name: </label>
      <input type="text" name="movieName" />
      <label>review: </label>
      <input type="text" name="review" />

      <button>Submit</button>
    </div>
     
    </div>
  );
}

export default App;
