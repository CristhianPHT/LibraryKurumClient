import { useState, useEffect } from 'react';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add your hook logic here

  return { books, loading, error };
};
