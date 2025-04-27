import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useEventStore } from '../store/eventStore';
import { useAuthStore } from '../store/authStore';

const Dashboard = () => {
  const { user } = useAuthStore();
  const {
    events,
    loading,
    error,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getSavedEvents,
    savedEvents,
  } = useEventStore();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    getEvents();
    getSavedEvents();
  }, [getEvents, getSavedEvents]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEvent) {
      await updateEvent(editingEvent._id, formData);
    } else {
      await createEvent(formData);
    }
    setShowModal(false);
    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
    });
    setEditingEvent(null);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      description: event.description,
      date: event.date.split('T')[0],
      time: event.time,
      location: event.location,
      category: event.category,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
    }
  };

  const userEvents = events.filter((event) => event.user._id === user._id);

  return (
    <Container className='my-5'>
      <Row className='mb-4'>
        <Col>
          <h2>Dashboard</h2>
          <Button variant='primary' onClick={() => setShowModal(true)}>
            Create New Event
          </Button>
        </Col>
      </Row>

      {/* My Events */}
      <Row className='mb-5'>
        <Col>
          <h3>My Events</h3>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='text-danger'>{error}</div>
          ) : (
            <Row>
              {userEvents.map((event) => (
                <Col key={event._id} md={4} className='mb-4'>
                  <Card>
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
                        className='me-2'
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='danger'
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      {/* Saved Events */}
      <Row>
        <Col>
          <h3>Saved Events</h3>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='text-danger'>{error}</div>
          ) : (
            <Row>
              {events
                .filter((event) => savedEvents.includes(event._id))
                .map((event) => (
                  <Col key={event._id} md={4} className='mb-4'>
                    <Card>
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
        </Col>
      </Row>

      {/* Create/Edit Event Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type='time'
                name='time'
                value={formData.time}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                name='location'
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Form.Select
                name='category'
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value=''>Select a category</option>
                <option value='Music'>Music</option>
                <option value='Sports'>Sports</option>
                <option value='Arts'>Arts</option>
                <option value='Food'>Food</option>
                <option value='Business'>Business</option>
                <option value='Technology'>Technology</option>
                <option value='Other'>Other</option>
              </Form.Select>
            </Form.Group>
            <Button type='submit' variant='primary' className='w-100'>
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard; 