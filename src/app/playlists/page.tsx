'use client'
import React, { useState, useEffect } from 'react';
import { PlaylistItem } from '@/components/playlist-item';
import { Playlist } from '@/interfaces/playlist';

export default function PlaylistsPage() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        fetch('/api/playlists')
          .then(response => response.json())
          .then(data => setPlaylists(data));
    }, []);

    return (
        <>
            <h1>Playlists</h1>
            <div>
                {playlists.map(playlist => (
                    <PlaylistItem key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </>
    );
}