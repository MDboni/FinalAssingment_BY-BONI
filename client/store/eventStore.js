import { create } from 'zustand';
import axios from 'axios';

const eventStore = create((set) => ({
  events: [],
  event: null,
  loading: false,
  error: null,
  savedEvents: [],

  setEvents: (events) => set({ events }),
  setEvent: (event) => set({ event }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSavedEvents: (savedEvents) => set({ savedEvents }),

  getEvents: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get('/api/events');
      set({ events: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error fetching events',
        loading: false,
      });
    }
  },

  getEvent: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`/api/events/${id}`);
      set({ event: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error fetching event',
        loading: false,
      });
    }
  },

  createEvent: async (eventData) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/events', eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        events: [...state.events, res.data],
        loading: false,
      }));
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error creating event',
        loading: false,
      });
    }
  },

  updateEvent: async (id, eventData) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/events/${id}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        events: state.events.map((event) =>
          event._id === id ? res.data : event
        ),
        event: res.data,
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error updating event',
        loading: false,
      });
    }
  },

  deleteEvent: async (id) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      await axios.delete(`/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        events: state.events.filter((event) => event._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error deleting event',
        loading: false,
      });
    }
  },

  getSavedEvents: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users/saved-events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ savedEvents: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error fetching saved events',
        loading: false,
      });
    }
  },

  saveEvent: async (eventId) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/users/save-event/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        savedEvents: [...state.savedEvents, eventId],
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error saving event',
        loading: false,
      });
    }
  },

  unsaveEvent: async (eventId) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/users/unsave-event/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        savedEvents: state.savedEvents.filter((id) => id !== eventId),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Error unsaving event',
        loading: false,
      });
    }
  },
}));

export const useEventStore = eventStore; 