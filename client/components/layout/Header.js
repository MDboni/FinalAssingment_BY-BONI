import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand>Event Platform</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Link to='/events' className='nav-link'>
                Events
              </Link>
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <Link to='/dashboard' className='dropdown-item'>
                    Dashboard
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                  <Link to='/register' className='nav-link'>
                    Register
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; 