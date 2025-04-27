import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-dark text-white py-4 mt-5'>
      <Container>
        <Row>
          <Col md={6}>
            <p className='mb-0'>&copy; 2023 Event Platform. All rights reserved.</p>
          </Col>
          <Col md={6} className='text-md-end'>
            <a href='#' className='text-white me-3'>
              Privacy Policy
            </a>
            <a href='#' className='text-white'>
              Terms of Service
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 