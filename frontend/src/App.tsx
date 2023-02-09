import React from 'react';
import Form from "./components/Form/Form";
import {Container} from "@mui/material";

function App() {
  return (
    <div className="App">
        <Container>
            <h1>Shorten your link!</h1>
            <Form/>
        </Container>

    </div>
  );
}

export default App;
