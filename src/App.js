import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './index.css';
import RoutesApp from './routes/Routes';
import SidebarMenu from './components/sidebarMenu/SidebarMenu';

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex">
        <SidebarMenu />
        <Container fluid className="d-flex align-items-start p-4 ">
          <RoutesApp />
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;