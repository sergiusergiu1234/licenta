import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = '/users/signin';

const LoginPage = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
 

    useEffect(() => {
        if (userRef.current) userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username:user, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const accessToken = response?.data?.token; 
            let roles = response?.data?.role;
            //save login response to local storage 
            await  window.localStorage.setItem("accessToken", accessToken);
            await  window.localStorage.setItem("roles", roles);
            await  window.localStorage.setItem("user", user);
            
            if (roles) {
                roles = roles.split(',');
              }
            console.log(response.data)

            setAuth({ user, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, {replace: true});
        } catch (err:any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            
        }
    }

    return (
       
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Don't have an account? <br />
                        <a href="/Register">Sign Up</a>
                    </p>
                </section>
    );
};
export default LoginPage;
