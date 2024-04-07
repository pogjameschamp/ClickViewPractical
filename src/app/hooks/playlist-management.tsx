import { Playlist } from "@/interfaces/playlist"
import { useState, useEffect, useCallback } from 'react';

export const usePlaylistManagement = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaylists = useCallback(async () => {
        try {
          const response = await fetch('/api/playlists');
          if (!response.ok) {
            throw new Error('Failed to fetch playlists');
          }
          const data = await response.json();
          setPlaylists(data);
          setError(null);
        } catch (err) {
          // Check if err is an instance of Error
          if (err instanceof Error && err.message) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      }, []);

    useEffect(() => {
    fetchPlaylists();
    }, [fetchPlaylists]);

    const addVideoToPlaylist = useCallback((playlistId: number, videoId: number) => {
    setPlaylists(currentPlaylists =>
        currentPlaylists.map(playlist => {
        if (playlist.id === playlistId && !playlist.videoIds.includes(videoId)) {
            return { ...playlist, videoIds: [...playlist.videoIds, videoId] };
        }
        return playlist;
        })
    );
    }, []);

    const removeVideoFromPlaylist = useCallback((playlistId: number, videoId: number) => {
    setPlaylists(currentPlaylists =>
        currentPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
            return { 
            ...playlist, 
            videoIds: playlist.videoIds.filter(id => id !== videoId)
            };
        }
        return playlist;
        })
    );
    }, []);

    return { playlists, error, addVideoToPlaylist, removeVideoFromPlaylist };

}