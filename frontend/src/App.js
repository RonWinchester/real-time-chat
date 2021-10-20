import React from "react";
import './App.css';
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";


function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="App">
      {loggedIn ?<Chat></Chat> :<Login></Login>}
    </div>
  );
}

export default App;
