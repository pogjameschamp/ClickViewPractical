import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Playlist } from '../interfaces/playlist';

interface PlaylistItemProps {
  playlist: Playlist;
  videos: { [id: number]: string };
  onRemoveVideo: (playlistId: number, videoId: number) => void;
}

export function PlaylistItem({ playlist, videos, onRemoveVideo }: PlaylistItemProps) {
  const [selectedVideo, setSelectedVideo] = useState<number>(-1);

  const videoCount = playlist.videoIds.length === 1 ? '1 video' : `${playlist.videoIds.length} videos`;

  const handleRemoveVideo = () => {
    if (selectedVideo !== -1) {
      onRemoveVideo(playlist.id, selectedVideo);
    }
  };

  return (
    <Row className="border rounded p-2 mb-2">
      <Col xs="12">
        <h2 className="h5">{playlist.name}</h2>
        <p>{playlist.description}</p>
        <p className="mb-2"><strong>{videoCount}</strong></p>
        <div className="mb-3">
          <select 
            value={selectedVideo} 
            onChange={(e) => setSelectedVideo(Number(e.target.value))}
            className="mr-2"
          >
            <option value={-1}>Select a Video</option>
            {playlist.videoIds.map(videoId => (
              <option key={videoId} value={videoId}>{videos[videoId]}</option>
            ))}
          </select>
          <button onClick={handleRemoveVideo}>Remove from Playlist</button>
        </div>
      </Col>
    </Row>
  );
}
