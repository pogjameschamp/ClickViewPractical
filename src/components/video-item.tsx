import { Col, Image, Row } from 'react-bootstrap';
import { Video } from '../interfaces/video';
import React, { useState } from 'react';
import { Playlist } from '../interfaces/playlist';
import "../app/globals.css"

interface VideoItemProps {
  video: Video;
  playlists: Playlist[];
  onAddToPlaylist: (playlistId: number, videoId: number) => void;
  onRemoveFromPlaylist: (playlistId: number, videoId: number) => void; 
}

export default function VideoItem(props: VideoItemProps) {
  const { video, playlists, onAddToPlaylist, onRemoveFromPlaylist } = props;
  const [selectedPlaylist, setSelectedPlaylist] = useState<number>(-1);

  const handleAddToPlaylist = () => {
    if (selectedPlaylist !== -1) {
      onAddToPlaylist(selectedPlaylist, video.id);
    }
  };

  const handleRemoveFromPlaylist = (playlistId: number) => {
    onRemoveFromPlaylist(playlistId, video.id);
  };

  
  return (
    <Row>
      <Col xs='12' md='3' className='mb-3'>
        <Image fluid rounded src={`${video.thumbnail}?size=small`} alt={video.name} className='w-100' />
      </Col>
      <Col xs='12' md='9' className='mb-3'>
        <h2 className='h4'>{video.name}</h2>
        <p>{video.description}</p>
        <div>
        <strong><p>Add this video to a Playlist: </p></strong>
        <select 
          value={selectedPlaylist} 
          onChange={(e) => setSelectedPlaylist(Number(e.target.value))}
        >
          <option value={-1}>Select Playlist</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
          ))}
        </select>
        <button className="" onClick={handleAddToPlaylist}>Add to Playlist</button>
        </div>
      </Col>
    </Row>
  )
}