import React from "react";
import './common.css'
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [res, setRes] = useState('');
    const [username, setUsername] = useState("RajNainaar");
    const [password, setPassword] = useState('Raj@123');
    const [errormesg, setErrormesg] = useState('');

    const mail = () => {
        emailjs.send('service_81bzvyx','template_4apvkde',{name:'Nainar',message:'Someone Loged in to React Movie App'},'JHrIm2aWoKh6sLS4b' )
        .then(res => {
            //console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2QzOWJmNjY5YjA0NWY0NGQwYzE0ZjRmNjY4YTZiNCIsInN1YiI6IjY0ODk4YjI2ZDJiMjA5MDBjYTIxZmFlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LxPBS-wFSbERnwvuYahRAp_pO90OP_e1JB4ZvH_DTIk'
            }
          };
          
          axios.get('https://api.themoviedb.org/3/account/20003266', options)
            .then(response => {
                if(response.status === 200){
                    setRes(response.data.username);
                    sessionStorage.setItem('currentuser',response.data.username);
                }
            })
            .catch(err => console.error(err));
    },[])

    const login = (e) => {
        e.preventDefault();
        if (username !== res) {
            setErrormesg('Please Check The Username');
        }
        if (password !== 'Raj@123') {
            setErrormesg('Please Check The Password');
        }
        if (username === res && password === 'Raj@123') {
            // mail();
            setErrormesg('');
            navigate('/home');
        }
    }

    return (
        <div>
            <div className="bdy">
                <div className="hed">
                    <h3>Cinema</h3>
                </div>
                <div className="cntr">
                    <div className="logform">
                        <h1 style={{ padding: '0', margin: '0' }}>Sign In</h1>
                        <p style={{ margin: '0', fontSize: '0.8em', color: 'grey' }}>Sign In To Your Self Service Portal</p><br />
                        <center style={{color:"grey"}}>username: RajNainaar || password : Raj@123</center>
                        <br />
                        <form onSubmit={login}>
                            <p style={{ color: 'red' }}>{errormesg !== '' ? errormesg : ''}</p>
                            <input
                                defaultValue={username}
                                placeholder={'Username'}
                                onChange={(e) => { setUsername(e.target.value) }}
                                className="loginpt"
                                required />
                            <br />
                            <input
                                defaultValue={password}
                                type={"password"}
                                placeholder={'Password'}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="loginpt"
                                required />
                            <button type="submit" className="logsbmt">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
