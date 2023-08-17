import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './index.css';
import RoutesApp from './routes/Routes';
import SidebarMenu from './components/sidebarMenu/SidebarMenu';
import Header from './components/header/Header'

function App() {
  return (
    <BrowserRouter>
     
      <div className="App d-flex flex-column">
        <SidebarMenu />
        <Header/>
       

        <Container fluid className="d-flex align-items-start p-4 ">
          <RoutesApp />
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;