import { createContext, useContext, useState, ReactNode } from 'react';
import { BookingModal } from '../components/ui/BookingModal';

interface BookingContextType {
  openBookingModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal = () => setIsOpen(true);
  const closeBookingModal = () => setIsOpen(false);

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
