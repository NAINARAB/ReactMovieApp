import React, { useEffect, useState } from "react";
import './common.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./head";
import { Link } from "react-router-dom";
import Card from "./card";

const Movie = () => {
    const [dat, setdat] = useState([]);
    const [videos, setvideos] = useState([]);
    const [similar, setSimilar] = useState([]);
    const imgURL = 'https://image.tmdb.org/t/p/w500';
    const { id } = useParams();
    const nav = useNavigate();
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2QzOWJmNjY5YjA0NWY0NGQwYzE0ZjRmNjY4YTZiNCIsInN1YiI6IjY0ODk4YjI2ZDJiMjA5MDBjYTIxZmFlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LxPBS-wFSbERnwvuYahRAp_pO90OP_e1JB4ZvH_DTIk'
        }
    };
    useEffect(() => {


        if (sessionStorage.getItem('currentuser') != null) {
            axios.get(`https://api.themoviedb.org/3/movie/${id}`, options)
                .then(response => {
                    if (response.status == 200) {
                        setdat(response.data);
                        console.log(response.data)
                    }
                })
                .catch(err => console.error(err));
            
            axios.get(`https://api.themoviedb.org/3/tv/${id}`, options)
                .then(response => {
                    if (response.status == 200) {
                        setdat(response.data);
                        console.log(response.data)
                    }
                })
                .catch(err => console.error(err));

            axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
                .then(res => {
                    if (res.status == 200) {
                        setvideos(res.data.results);
                    }
                })
                .catch(e => console.log(e));

            axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, options)
                .then(res => {
                    if (res.status == 200) {
                        setSimilar(res.data.results);
                    }
                })
                .catch(e => console.log(e));
        }
    }, [id])


    return (
        <div className="gradient">
            {sessionStorage.getItem('currentuser') != null ?
                <>
                    <Header />
                    <div className="backdiv">
                        <button onClick={() => { nav('/home') }} className="back"><i className="fa-solid fa-arrow-left"></i></button>
                    </div>
                    <div className="desc">
                        <div className="coldiv4">
                            <h1>{dat.title}</h1><br />
                            <p>Rating : {dat.vote_average}</p><br />
                            <p>{dat.overview}</p><br />
                            <h4>{'Released Date ' + dat.release_date}</h4>
                            <h4>Language : {' ' + dat.original_language}</h4>
                        </div>
                        <div className="coldiv6">
                            <img src={dat.backdrop_path !== null ? imgURL+dat.backdrop_path : 'https://www.cloudways.com/blog/wp-content/uploads/wordpress-404-error-t.jpg' }  />
                        </div>
                    </div>
                    <div>
                        <h2 style={{ color: 'white', padding: '0 2em' }}>Videos</h2>
                        <div className="movielist">
                            {videos.map((item, index) => (
                                <>
                                    {index <= 2 ?
                                        <iframe
                                            width="360"
                                            height="215"
                                            src={"https://www.youtube.com/embed/" + item.key}
                                            title="YouTube video player"
                                            frameborder="0"
                                            allowfullscreen>
                                        </iframe>
                                        :
                                        null
                                    }
                                </>
                            ))}
                            {Object.keys(videos).length == 0 ? <h3 style={{ color: '#f2f2f2', padding: '0 2em' }}>No Videos Found</h3> : null}
                        </div>
                    </div>
                    <div>
                        <h2 style={{ color: 'white', padding: '0 2em' }}>Similar Movies</h2>
                        <div className="movielist">
                            {similar.map(obj => <Card dat={obj} />)}
                        </div>
                    </div>
                </> :
                <div style={{ padding: '2em', fontSize: 'larger', fontWeight: 'bold' }}>
                    <center>404 Error! Please Login&emsp;<Link to={'/'} >Click Here</Link></center>
                </div>
            }
        </div>
    );
}


export default Movie;