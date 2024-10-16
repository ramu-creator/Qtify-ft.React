import React from 'react'
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
const ParticularPage = () => {
    const location = useLocation();
    const Page = location.state.item;
    console.log(Page);

    // Function to convert milliseconds to minutes and seconds
    const formatDuration = (durationInMs) => {
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = Math.floor((durationInMs % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`;
  };
  // Count the number of songs (based on the number of unique song IDs)
  const songCount = Page.songs.length;

  // Calculate the total duration of all songs
  const totalDurationInMs = Page.songs.reduce((total, song) => total + song.durationInMs, 0);

  // Format total duration into "XX min YY sec"
  const totalFormattedDuration = formatDuration(totalDurationInMs);
  return (
    <>
      <div>
        <NavBar/>
        <div id='inner-container'>
          <img id='inn-image' src={Page.image} alt={Page.title} />
          <div id='inn-content'>
            <h1 id='inn-h1'>Best of {Page.title} in 2023</h1>
            <p id='inn-p1'>{Page.description}</p>
            <div id='span-container'>
                <span id="inn-p2">{songCount}&nbsp;songs</span>
                <span id='inn-p2'>{totalFormattedDuration}</span>
                <span id='inn-p2'>{Page.follows}&nbsp;follows</span>
            </div>
            <div>
                <button id='inn-bt'>Shuffle</button>
                <button id='inn-bt'>Add to library</button>
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
                Page.songs.map((track, index) => (
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
      </div>
    </> 
  )
}
export default ParticularPage;
