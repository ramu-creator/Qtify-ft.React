import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Body = () => {
    const [top,setTop] = useState([]);
    const [New,setNew] = useState([]);
    const [song,setSong] = useState([]);
    const [search,setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        fetch("https://qtify-backend-labs.crio.do/albums/top")
        .then(res=>res.json())
        .then(res=>{
             setTop(res);
             console.log(res);
         }).catch(err => console.error(err));
    },[]);
    useEffect(()=>{
        fetch("https://qtify-backend-labs.crio.do/albums/new")
        .then(res=>res.json())
        .then(res=>{
             setNew(res);
             console.log(res);
         }).catch(err => console.error(err));
    },[]);
    useEffect(()=>{
        fetch("https://qtify-backend-labs.crio.do/songs")
        .then(res=>res.json())
        .then(res=>{
             setSong(res);
             console.log(res);
         }).catch(err => console.error(err));
    },[]);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 2000, min: 1000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1000, min: 124 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 124, min: 24 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 24, min: 0 },
          items: 1
        }
      };
      // Filter the data based on the search
  const filteredTop = top.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
  const filteredNew = New.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <>
      <div id='search-content'>
          <input id='search' 
          type="text" 
          placeholder='Search a album of your choice'
          value={search}
          onChange={(event)=>setSearch(event.target.value)}
          /><input id='search-icon' type="text"/><i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div id='carousel-content'>
        <h2 id='t-alb'>Top Albums</h2>
        <Carousel responsive={responsive} infinite={true} arrows={true}>
          {filteredTop.map(item => (
            <div id='top-album' key={item.id}>
              <img id='top-imgs' src={item.image} alt={item.title} onClick={()=>navigate("/page",{state:{item}})} />
              <div id='top-follows'>
                <p id='top-f'>{item.follows} Follows</p>
              </div>
              <p id='top-title'>{item.title}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <div id='carousel-content'>
        <h2 id='t-alb'>New Albums</h2>
        <Carousel responsive={responsive} infinite={true} arrows={true}>
          {filteredNew.map(item => (
            <div id='top-album' key={item.id}>
              <img id='top-imgs' src={item.image} alt={item.title} onClick={()=>navigate("/newpage",{state:{item}})} />
              <div id='top-follows'>
                <p id='top-f'>{item.follows} Follows</p>
              </div>
              <p id='top-title'>{item.title}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <div id='hr-div'>
        <hr id='hr-line' />
      </div>

      <div id='carousel-content'>
        <h2 id='t-alb-s'>Songs</h2>
        <div id='song-nav'>
            <ul id='s-nav-content'>
                <li>ALL</li>
                <li>ROCK</li>
                <li>POP</li>
                <li>JAZZ</li>
                <li>BLUES</li>
            </ul>
        </div>
        <Carousel responsive={responsive} infinite={true} arrows={true}>
          {song.map(item => (
            <div id='top-album' key={item.id}>
              <img id='top-imgs' src={item.image} alt={item.title} />
              <div id='top-follows'>
                <p id='top-f'>{item.follows} Follows</p>
              </div>
              <p id='top-title'>{item.title}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <div id='div-height'></div>
      <div id='hr-div'>
        <hr id='hr-line' />
      </div>
    </>
  )
}
export default Body
