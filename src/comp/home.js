import React, { useRef } from "react";
import { useState, useEffect } from "react";
import './common.css'
import axios from 'axios';
import Header from "./head";
import Card from "./card";
import { Link } from "react-router-dom";

const Home = () => {
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [top, setTop] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const myRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2QzOWJmNjY5YjA0NWY0NGQwYzE0ZjRmNjY4YTZiNCIsInN1YiI6IjY0ODk4YjI2ZDJiMjA5MDBjYTIxZmFlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LxPBS-wFSbERnwvuYahRAp_pO90OP_e1JB4ZvH_DTIk'
    }
  };

  const homecontent = [
    {
      name: 'POPULAR MOVIES ( TOP 20 )',
      url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bcd39bf669b045f44d0c14f4f668a6b4',
      var: movie,
      fun: setMovie,
    },
    {
      name: 'TOP RATED MOVIES ( TOP-20 )',
      url: 'https://api.themoviedb.org/3/movie/top_rated?language=en',
      var: top,
      fun: setTop,
    },
    {
      name: 'UP COMMING MOVIES ( TOP-20 )',
      url: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
      var: upcoming,
      fun: setUpcoming,
    },
    {
      name: 'TV SERIAL MOVIES ( TOP-20 )',
      url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',
      var: tv,
      fun: setTv,
    },
  ]

  useEffect(() => {
    if (sessionStorage.getItem('currentuser') != '' && sessionStorage.getItem('currentuser') != null) {
      homecontent.map(obj => {
        axios.get(obj.url, options)
          .then(response => {
            if (response.status === 200) {
              obj.fun(response.data.results)
            }
          })
      })
    }
  }, [])

  return (
    <div>
      {sessionStorage.getItem('currentuser') != '' && sessionStorage.getItem('currentuser') != null
        ?
        <>
          <Header />
          <div className="homecontent">
            .
          </div>

          <div className="homehover">
            <center style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '35vh' }}>
              <h2>Welcome To Our Movie Site</h2>
              <h1>OUR SPECIAL <h1 style={{ color: 'red', display: 'inline', fontSize: '1em' }}>MOVIES</h1></h1>
              <p>Lorem Ipsum is simply dummy text of the printing</p>
              <p>typesetting industrioy. Lorem Ipsum has been the industry's</p>
              <p>standard dummy text ever since the 1500s, when an unknown.</p>
              <button className="readmore" onClick={() => { myRef.current.scrollIntoView() }}>Read More</button>
            </center>
          </div>

          <div ref={myRef} style={{ paddingTop: '2em', background: 'linear-gradient(to right, #3a6186, #89253e)' }}>
            {homecontent.map(obj => (
              <>
                <h2 style={{ color: 'white', padding: '1em 1.4em 0 1.4em', }}>{obj.name}</h2>
                <div className="movielist">
                  {obj.var.map(ob => (
                    <Card dat={ob} />
                  ))}
                </div>
              </>
            ))}
          </div>
        </>
        :
        <div style={{ padding: '2em', fontSize: 'larger', fontWeight: 'bold' }}>
          <center>404 Error! Please Login&emsp;<Link to={'/'} >Click Here</Link></center>
        </div>
      }
    </div>
  );
}

export default Home;
