'use client';
import React, { useState, useEffect } from 'react';
import { PlaylistItem } from '@/components/playlist-item';
import { Playlist } from '@/interfaces/playlist';
import { Video } from '@/interfaces/video';
import { Button, Form, InputGroup } from 'react-bootstrap';

export default function PlaylistsPage() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [videos, setVideos] = useState<{ [key: number]: string }>({});
    const [newPlaylistName, setNewPlaylistName] = useState('');
  
  useEffect(() => {
    fetch('/api/playlists')
      .then(response => response.json())
      .then(data => setPlaylists(data));

    fetch('/api/videos')
      .then(response => response.json())
      .then(data => {
        const videoMap = data.reduce((acc: { [key: number]: string }, video: Video) => {
          acc[video.id] = video.name;
          return acc;
        }, {});
        setVideos(videoMap);
      });
  }, []);

  const removeVideoFromPlaylist = (playlistId: number, videoId: number) => {
    setPlaylists(prevPlaylists => prevPlaylists.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, videoIds: playlist.videoIds.filter(id => id !== videoId) };
      }
      return playlist;
    }));
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() !== '') {
      const newPlaylist = {
        id: Math.max(0, ...playlists.map(p => p.id)) + 1,
        name: newPlaylistName,
        description: '',
        videoIds: []
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
    }
  };

  const handleDeletePlaylist = (playlistId: number) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
  };

  return (
    <>
      <h1>Playlists</h1>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="New Playlist Name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleCreatePlaylist}>
          Create Playlist
        </Button>
      </InputGroup>
      {playlists.map(playlist => (
        <div key={playlist.id} className="mb-3">
          <PlaylistItem 
            playlist={playlist} 
            videos={videos} 
            onRemoveVideo={removeVideoFromPlaylist}
          />
          <Button variant="danger" onClick={() => handleDeletePlaylist(playlist.id)}>
            Delete Playlist
          </Button>
        </div>
      ))}
    </>
  );
}
