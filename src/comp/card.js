import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const imgURL = 'https://image.tmdb.org/t/p/w500';
  const { dat } = props;
  const url = `/movie/${dat.id}`;
  const star = parseInt(dat.vote_average / 2);
  const nav = useNavigate();

  return (
    <div className="card" onClick={() => { nav(url); }}>
      <div className="cardimg">
        <img
          src={dat.poster_path !== null ?
            imgURL + dat.poster_path : 'https://www.javatpoint.com/fullformpages/images/png.png'}
        />
        {/* <div className="cardhover">
          <button className="back" style={{position:'absolute', top: '40%',left:'30%'}}><i class="fa-regular fa-heart"></i></button>
        </div> */}
      </div>
      <div className="cardtitle">
        <div style={{ maxHeight: '1em', margin: '0', overflow: 'hidden' }}>
          <h5 style={{ margin: '0' }}>{dat.original_title ? dat.original_title : dat.name}</h5>
        </div><br />
        <p style={{ margin: '0', display: 'inline', fontSize: '10px', color: 'white' }}>
          {star <= 2 ? <><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></> : null}
          {star === 3 ? <><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></> : null}
          {star >= 4 ? <><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></> : null}
          {'( ' + dat.vote_count + ' )'}
        </p>
        <button onClick={() => {
          nav(url);
        }}><i className="fa-regular fa-circle-play" style={{ color: 'black' }}></i></button>
      </div>
    </div>
  );
}

export default Card;