import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEventStore } from '../store/eventStore';

const HomePage = () => {
  const { events, loading, error, getEvents } = useEventStore();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <>
      {/* Hero Section */}
      <div className='bg-primary text-white py-5'>
        <Container>
          <Row className='align-items-center'>
            <Col md={6}>
              <h1 className='display-4 fw-bold'>Find Your Next Event</h1>
              <p className='lead'>
                Discover and save local events that match your interests.
              </p>
              <Link to='/events' className='btn btn-light btn-lg'>
                Browse Events
              </Link>
            </Col>
            <Col md={6}>
              <img
                src='https://via.placeholder.com/600x400'
                alt='Event Platform'
                className='img-fluid rounded'
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Categories Section */}
      <Container className='my-5'>
        <h2 className='text-center mb-4'>Categories</h2>
        <Row>
          {['Music', 'Sports', 'Arts', 'Food', 'Business', 'Technology'].map(
            (category) => (
              <Col key={category} md={4} className='mb-4'>
                <Card className='h-100'>
                  <Card.Body className='text-center'>
                    <h3>{category}</h3>
                    <Link
                      to={`/events?category=${category}`}
                      className='btn btn-outline-primary'
                    >
                      View Events
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          )}
        </Row>
      </Container>

      {/* Upcoming Events Section */}
      <Container className='my-5'>
        <h2 className='text-center mb-4'>Upcoming Events</h2>
        {loading ? (
          <div className='text-center'>Loading...</div>
        ) : error ? (
          <div className='text-center text-danger'>{error}</div>
        ) : (
          <Row>
            {events.slice(0, 3).map((event) => (
              <Col key={event._id} md={4} className='mb-4'>
                <Card className='h-100'>
                  <Card.Img
                    variant='top'
                    src={event.image || 'https://via.placeholder.com/300x200'}
                  />
                  <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>
                      <small className='text-muted'>
                        {new Date(event.date).toLocaleDateString()} at{' '}
                        {event.time}
                      </small>
                      <br />
                      {event.location}
                    </Card.Text>
                    <Link
                      to={`/events/${event._id}`}
                      className='btn btn-primary'
                    >
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <div className='text-center mt-4'>
          <Link to='/events' className='btn btn-outline-primary'>
            View All Events
          </Link>
        </div>
      </Container>
    </>
  );
};

export default HomePage; 