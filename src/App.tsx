import React from 'react';
import './App.styl';
import {useImageContext} from "./context/context";
import ImageLoader from "./components/image-loader/image-loader";
import Workspace from "./components/workspace/workspace";
import Header from "./components/header/header";
import Toolbar from "./components/toolbar/toolbar";


function App() {

  const {image} = useImageContext();
  return (
    <div className="app">
      <Header/>
      <div className="content">
        {image ? <>
          <Toolbar/>
          <Workspace/>
          </> : <ImageLoader/>}
      </div>
    </div>
  );
}

export default App;
