import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const NewPage = () => {
    const location = useLocation();
    const newPage = location.state.item;
    console.log(newPage);

    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 10; // Number of items per page

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

    // Calculate the songs to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newPage.songs.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(songCount / itemsPerPage)) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <div>
                <NavBar />
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
                  {/* Pagination Controls */}
                  <div className="pagination">
                      <button id='pg-btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      <span>Page {currentPage} of {Math.ceil(songCount / itemsPerPage)}</span>
                      <button id='pg-btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(songCount / itemsPerPage)}>
                      <i className="fa-solid fa-chevron-right"></i>
                      </button>
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
                                currentItems.map((track, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img className="song-image" style={{ height: "70px", width: "70px" }} src={track.image} alt="#" />
                                            {track.title}
                                        </td>
                                        <td>{track.artists[0]}</td>
                                        <td>{formatDuration(track.durationInMs)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default NewPage;
