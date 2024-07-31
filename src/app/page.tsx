"use client";

import { useEffect } from 'react';

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }

  return undefined;
};

export default function HomePage() {
  useEffect(() => {
    const key = getCookie('key');

    if (key) {
      const ws = new WebSocket('ws://localhost:3001');

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        ws.send(key);
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

      const intervalId = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log(`Sending key again: ${key}`);
          ws.send(key);
        }
      }, 5000);

      return () => {
        clearInterval(intervalId);
        ws.close();
      };
    } else {
      console.log('No key found in cookies');
    }
  }, []);

  return <div>Welcome to the homepage!</div>;
}
