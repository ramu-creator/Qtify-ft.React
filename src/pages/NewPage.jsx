import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom'
const NewPage = () => {
    const location = useLocation();
    const newPage  = location.state.item;
    // Function to convert milliseconds to minutes and seconds
    const formatDuration = (durationInMs) => {
      const minutes = Math.floor(durationInMs / 60000);
      const seconds = Math.floor((durationInMs % 60000) / 1000);
      return `${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`;
  };
  // Count the number of songs (based on the number of unique song IDs)
  const songCount = newPage.songs.length;

  // Calculate the total duration of all songs
  const totalDurationInMs = newPage.songs.reduce((total, song) => total + song.durationInMs, 0);

  // Format total duration into "XX min YY sec"
  const totalFormattedDuration = formatDuration(totalDurationInMs);
  return (
    <>
      <NavBar/>
      <div>
        <div id='inner-container'>
          <img id='inn-image' src={newPage.image} alt={newPage.title} />
          <div id='inn-content'>
            <h1 id='inn-h1'>Best of {newPage.title} in 2023</h1>
            <p id='inn-p1'>{newPage.description}</p>
            <div id='span-container'>
                <span id="inn-p2">{songCount}&nbsp;songs</span>
                <span id='inn-p2'>{totalFormattedDuration}</span>
                <span id='inn-p2'>{newPage.follows}&nbsp;follows</span>
            </div>
            <div>
                <button id='inn-bt'>Shuffle</button>
                <button id='inn-bt'>Add to library</button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-container">
      <table className="styled-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {
                newPage.songs.map((track, index) => (
                  <tr key={index}>
                    <td><img className="song-image" style={{height:"70px", width:"70px"}} src={track.image} alt="#" />{[track.title]}</td>
                    <td>Rs.{[track.artists[0]]}</td>
                    <td>{formatDuration(track.durationInMs)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      </div>
      <Footer/>
    </>
  )
}

export default NewPage
