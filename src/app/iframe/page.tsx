"use client";

import { useEffect, useState } from 'react';

export default function IframePage() {
    const [iframeSrc, setIframeSrc] = useState<string | null>(null);

    useEffect(() => {
        const key = new URLSearchParams(window.location.search).get('key');

        if (key) {
            fetch(`/api/secret?key=${key}`)
                .then(response => response.json())
                .then(data => {
                    setIframeSrc(data.iframeUrl);
                })
                .catch(error => console.error('Error fetching iframe URL:', error));
        }
    }, []);

    return (
        <div>
            {iframeSrc ? (
                <iframe
                    src={iframeSrc}
                    width="100%"
                    height="600"
                    style={{ border: 'none' }}
                    title="Embedded Page"
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
