import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import {db,auth ,signInWithEmailAndPassword, signInWithPopup, provider} from "../src/firebase/firebase";

import axios from './api/axios';
import { async } from '@firebase/util';
import { GoogleAuthProvider } from 'firebase/auth';

import Home from "./Home";
const LOGIN_URL = '/auth';

const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState('aa@aa.aa');
	const [password, setPassword] = useState('asdASD1!');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Email:",email);
		console.log("Password:",password);
		// const auth = getAuth();
		signInWithEmailAndPassword(auth,email,password)
		.then((userCredential) => {
			//Signed in
			const user = userCredential.user;
			console.log(user);
			setAuth({ email, password, user });
			setEmail('');
			setPassword('');
			setSuccess(true);

		})
		.catch((error) =>{
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(error);
		})
	};
	const googleSign = async (e) => {
		e.preventDefault();
		signInWithPopup(auth,provider)
		.then((result) => {
			//The gives you a Google Access Token. you can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const accessToken = credential.accessToken;
			//The signed-id in user infor.
			const user = result.user;
			setAuth({ accessToken });
			setSuccess(true);

		})
		.catch((error) =>{
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			// const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
	}

	return (
		<>
			{success ? (
				<Home />
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Sign In</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="Email">Email:</label>
						<input
							type="text"
							id="email"
							ref={emailRef}
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
						<button>Sign In</button>
					</form>
					<div>
					<button onClick={googleSign}>
							Google
						</button>
						
					</div>
						
					<p>
						Need an Account?
						<br />
						<span className="line">
							<a href="/">Sign Up</a>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Login;
