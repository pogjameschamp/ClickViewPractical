'use client'
import React, { useState, useEffect } from 'react';
import VideoItem from '@/components/video-item';
import { Video } from '@/interfaces/video';

const VideosPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        fetch('/api/videos')
          .then(response => response.json())
          .then(data => setVideos(data));
      }, []);

      return (
        <>
        <h1>Videos</h1>
        <div>
          {videos.map(video => (
            <VideoItem key={video.id} video={video} />
          ))}
        </div>
        </>
      );

}
export default VideosPage;