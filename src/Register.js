import { useRef, useState, useEffect } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from './Login';
import axios from './api/axios';
import {db,auth ,createUserWithEmailAndPassword,set,ref} from "../src/firebase/firebase";


const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEMail] = useState('test1@aa.aa');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [pwd, setPwd] = useState('asdASD1!');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('asdASD1!');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [email, pwd, matchPwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = EMAIL_REGEX.test(email);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg('Invalid Entry');
			return;
		}
		createUserWithEmailAndPassword(auth,email,pwd)
		.then((userCredential) => {
			//Signed
			const user = userCredential.user;
			set(ref(db,'users/'+user.uid),{
				username : 'username',
				email : email,
				profile_picture:'imageUrl',
			});

		})
		.catch((error)=>{
			const errorCode = error.code;
			const errorMessage = error.message;
		});
		// try {
		// 	const response = await axios.post(
		// 		REGISTER_URL,
		// 		JSON.stringify({ user, pwd }),
		// 		{
		// 			headers: { 'Content-Type': 'application/json' },
		// 			withCredentials: true,
		// 		}
		// 	);
		// 	// TODO: remove console.logs before deployment
		// 	console.log(JSON.stringify(response?.data));
		// 	setSuccess(true);
		// 	//clear state and controlled inputs
		// 	setUser('');
		// 	setPwd('');
		// 	setMatchPwd('');
		// } catch (err) {
		// 	if (!err?.response) {
		// 		setErrMsg('No Server Response');
		// 	} else if (err.response?.status === 409) {
		// 		setErrMsg('Username Taken');
		// 	} else {
		// 		setErrMsg('Registration Failed');
		// 	}
		// 	errRef.current.focus();
		// }
	};

	return (
		<>
			{success ? (
				<Login />
			) : (
				<section >
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Register</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">
							Email:
							<FontAwesomeIcon
								icon={faCheck}
								className={validEmail ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validEmail || !email ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="text"
							id="email"
							ref={emailRef}
							autoComplete="off"
							onChange={(e) => setEMail(e.target.value)}
							value={email}
							required
							aria-invalid={validEmail ? 'false' : 'true'}
							aria-describedby="uidnote"
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
						/>
						<p
							id="uidnote"
							className={
								emailFocus && email && !validEmail ? 'instructions' : 'offscreen'
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							4 to 24 characters.
							<br />
							Must begin with a letter.
							<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>

						<label htmlFor="password">
							Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validPwd ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validPwd || !pwd ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							aria-invalid={validPwd ? 'false' : 'true'}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<p
							id="pwdnote"
							className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							8 to 24 characters.
							<br />
							Must include uppercase and lowercase letters, a number and a
							special character.
							<br />
							Allowed special characters:{' '}
							<span aria-label="exclamation mark">!</span>{' '}
							<span aria-label="at symbol">@</span>{' '}
							<span aria-label="hashtag">#</span>{' '}
							<span aria-label="dollar sign">$</span>{' '}
							<span aria-label="percent">%</span>
						</p>

						<label htmlFor="confirm_pwd">
							Confirm Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validMatch && matchPwd ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validMatch || !matchPwd ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="password"
							id="confirm_pwd"
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? 'false' : 'true'}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p
							id="confirmnote"
							className={
								matchFocus && !validMatch ? 'instructions' : 'offscreen'
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>

						<button
							disabled={!validEmail || !validPwd || !validMatch ? true : false}
						>
							Sign Up
						</button>
					</form>
					
					<p>
						Already registered?
						<br />
						<span className="line">
							<a href="/login">Sign In</a>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Register;
