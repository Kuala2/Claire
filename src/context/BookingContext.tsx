import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { BookingModal } from '../components/ui/BookingModal';

interface BookingContextType {
  openBookingModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal = () => setIsOpen(true);
  const closeBookingModal = () => setIsOpen(false);

  useEffect(() => {
    window.addEventListener('open-booking', openBookingModal);
    return () => window.removeEventListener('open-booking', openBookingModal);
  }, []);

  return (
    <BookingContext.Provider value={{ openBookingModal }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBookingModal} />
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
