import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Components/Home/Home";
import PostForm from "./Components/PostForm/Postform";
import Header from "./Components/Header/Hedaer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" index element={<Home/>}/>
          <Route path="/add" element={<PostForm/>} />
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App;
