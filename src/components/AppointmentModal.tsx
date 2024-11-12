import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { X } from 'lucide-react';
import 'react-day-picker/dist/style.css';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !time) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        name,
        email,
        date: selectedDate,
        time,
        notes,
        createdAt: new Date(),
      });
      onClose();
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary">Book Appointment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <select
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
            >
              <option value="">Select a time</option>
              {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
              rows={3}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}