import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useEventStore } from '../store/eventStore';
import { useAuthStore } from '../store/authStore';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, loading, error, getEvent, saveEvent, unsaveEvent } = useEventStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getEvent(id);
  }, [id, getEvent]);

  const handleSaveEvent = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    await saveEvent(id);
  };

  const handleUnsaveEvent = async () => {
    await unsaveEvent(id);
  };

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center text-danger'>{error}</div>;
  if (!event) return <div className='text-center'>Event not found</div>;

  return (
    <Container className='my-5'>
      <Row>
        <Col md={8}>
          <Card className='mb-4'>
            <Card.Img
              variant='top'
              src={event.image || 'https://via.placeholder.com/800x400'}
            />
            <Card.Body>
              <Card.Title className='display-4'>{event.name}</Card.Title>
              <Card.Text>
                <strong>Date:</strong>{' '}
                {new Date(event.date).toLocaleDateString()}
                <br />
                <strong>Time:</strong> {event.time}
                <br />
                <strong>Location:</strong> {event.location}
                <br />
                <strong>Category:</strong>{' '}
                <span className='badge bg-primary'>{event.category}</span>
              </Card.Text>
              <Card.Text>{event.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h4>Event Details</h4>
              <p>
                <strong>Organizer:</strong> {event.user?.name}
              </p>
              <p>
                <strong>Contact:</strong> {event.user?.email}
              </p>
              {user && (
                <div className='mt-3'>
                  {user.savedEvents?.includes(id) ? (
                    <Button
                      variant='outline-danger'
                      onClick={handleUnsaveEvent}
                      className='w-100'
                    >
                      Unsave Event
                    </Button>
                  ) : (
                    <Button
                      variant='primary'
                      onClick={handleSaveEvent}
                      className='w-100'
                    >
                      Save Event
                    </Button>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetail; 