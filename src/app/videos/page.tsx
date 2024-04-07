'use client';
import React, { useState, useEffect } from 'react';
import VideoItem from '@/components/video-item';
import { usePlaylistManagement } from '../hooks/playlist-management';
import { Video } from '@/interfaces/video';

const VideosPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const { playlists, addVideoToPlaylist, removeVideoFromPlaylist } = usePlaylistManagement();

    useEffect(() => {
        fetch('/api/videos')
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    return (
        <div>
            <h1>Videos</h1>
            <div>
                {videos.map(video => (
                    <VideoItem 
                        key={video.id} 
                        video={video} 
                        playlists={playlists} 
                        onAddToPlaylist={addVideoToPlaylist} 
                        onRemoveFromPlaylist={removeVideoFromPlaylist}
                    />
                ))}
            </div>
        </div>
    );
}

export default VideosPage;
