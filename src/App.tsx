import React from 'react';
import './App.css';
import {useImageContext} from "./context/context";
import ImageLoader from "./components/image-loader/image-loader";


function App() {

  const {image} = useImageContext();
  console.log(image);
  return (
    <div className="app">
      <header className="app-header">
        photo editor
      </header>
      <div className="content">
        {image ? <img src={image} alt=""/> : <ImageLoader/>}
      </div>
    </div>
  );
}

export default App;
