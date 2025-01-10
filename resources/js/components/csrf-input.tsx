// components/CSRF.tsx
import { useEffect } from 'react';

interface CSRFProps {
  setData: (key: string, value: string) => void;
}

export const CSRF = ({ setData }: CSRFProps) => {
  useEffect(() => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
      setData('_token', token);
    }
  }, []);

  return null;
};

// Usage in AddUser:
// <CSRF setData={setData} />
