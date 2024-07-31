"use client";

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('key');

    if (key) {
      const ws = new WebSocket('ws://localhost:3001');

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        setInterval(() => {
          ws.send(key);
        }, 5000);
      };

      ws.onmessage = (event) => {
        console.log('Message from server:', event.data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
  }, []);

  return <div>Welcome to the homepage!</div>;
}
