import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useEventStore } from '../store/eventStore';

const EventListings = () => {
  const { events, loading, error, getEvents } = useEventStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setSearchParams({ ...filters, [name]: value });
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      !filters.category || event.category === filters.category;
    const matchesSearch =
      !filters.search ||
      event.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.location.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container>
      <h1 className='text-center my-4'>Events</h1>

      {/* Filters */}
      <Card className='mb-4'>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type='text'
                    name='search'
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder='Search by name or location'
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name='category'
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value=''>All Categories</option>
                    <option value='Music'>Music</option>
                    <option value='Sports'>Sports</option>
                    <option value='Arts'>Arts</option>
                    <option value='Food'>Food</option>
                    <option value='Business'>Business</option>
                    <option value='Technology'>Technology</option>
                    <option value='Other'>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Events Grid */}
      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : error ? (
        <div className='text-center text-danger'>{error}</div>
      ) : (
        <Row>
          {filteredEvents.map((event) => (
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
                    <br />
                    <span className='badge bg-primary'>{event.category}</span>
                  </Card.Text>
                  <Button
                    variant='primary'
                    href={`/events/${event._id}`}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default EventListings; 