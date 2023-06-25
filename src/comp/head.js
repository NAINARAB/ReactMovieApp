import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Card from "./card";

const Header = () => {
    const nav = useNavigate();
    const [movie, setMovie] = useState([]);
    const [disp, setDisp] = useState(false);
    const [message, setMessage] = useState('');

    const search = (e) => {
        setDisp(true);
        setMessage('');
        if (e.target.value == '') {
            setDisp(false)
        }
        let mov = e.target.value;
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=bcd39bf669b045f44d0c14f4f668a6b4&query=' + `${mov}`
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    setMovie(response.data.results);
                    if (response.data.results.length == 0) {
                        setMessage('No Matches')
                    }
                    if (response.data.results.length >= 1) {
                        setMessage('Matches Found')
                    }
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <div className="hed">
                <h2 style={{ display: 'inline', margin: '1em' }}>Cinema</h2>
                <div style={{ float: 'right', display: 'flex', flexDirection: 'row' }}>
                    <div className="searchdiv">
                        <input className="serch" list="mo" onInput={(e) => { search(e) }} placeholder="Search Movies" />
                        <div className="serchicon">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                    <button onClick={() => { nav('/'); sessionStorage.removeItem('currentuser'); }} className="logout">Log Out</button>
                </div>
            </div>
            {disp === true ?
                <>
                    <div className="searchback" onClick={() => { setDisp(false); setMessage(''); }}>
                        <div className="searchmovie">
                            <div className="searchclose">
                                <button onClick={() => { setDisp(false); setMessage(''); }}><i className="fa-solid fa-circle-xmark"></i></button>
                            </div>
                            {movie.length >= 1 ?
                                <>
                                    <h2 style={{ color: "white" }}>Results Count ({movie.length})</h2><br />
                                </> : null}
                            <div className="flex">
                                {movie.map(obj => (
                                    <Card dat={obj} />
                                ))}
                                {/* {movie.length === 0 ? <h2 style={{ color: "white" }}>No Movies Found</h2> : null} */}
                                {message === '' ?
                                    <h2 style={{ color: "white" }}>Loading...</h2>
                                    :
                                    <h2 style={{ color: "white" }}>{message == 'No Matches' ? message : null}</h2>
                                }
                            </div>
                        </div>
                    </div>
                </>
                :
                null
            }
        </>
    );
}

export default Header;