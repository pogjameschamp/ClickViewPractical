'use client';
import React, { useState, useEffect } from 'react';
import { PlaylistItem } from '@/components/playlist-item';
import { Playlist } from '@/interfaces/playlist';
import { Video } from '@/interfaces/video'; // Import Video interface

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [videos, setVideos] = useState<{ [key: number]: string }>({});

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
        // Filter out the videoId to remove
        return { ...playlist, videoIds: playlist.videoIds.filter(id => id !== videoId) };
      }
      return playlist;
    }));
  };

  return (
    <>
      <h1>Playlists</h1>
      <div>
        {playlists.map(playlist => (
          <PlaylistItem 
            key={playlist.id} 
            playlist={playlist} 
            videos={videos} 
            onRemoveVideo={removeVideoFromPlaylist} 
          />
        ))}
      </div>
    </>
  );
}
