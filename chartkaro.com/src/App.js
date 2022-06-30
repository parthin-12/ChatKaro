import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import JoinPage from "./component/Join/JoinPage.js"
import ChatPage from "./component/Chat/ChatPage.js"


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<JoinPage/>}/>
          <Route exact path='/chat' element={<ChatPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
