import { async } from '@firebase/util';
import { useRef, useState, useEffect, useContext } from 'react';
import {db,auth ,signInWithEmailAndPassword, signOut, signInWithPopup, provider, getToken, messaging} from "../src/firebase/firebase";
import Login from './Login';
import {Button, Row, Col, Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () =>{
    const [success, setSuccess] = useState(true);
    const [show, setShow] = useState(false);

    const onSignOut = async (e) => {
        console.log('1');
        await signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout")
            setSuccess(false);
          }).catch((error) => {
            // An error happened.
            console.log(error);
          });
          console.log('out');
    }
    const onMessaging = async (e) => {
      setShow(true);
        console.log("Messaging!");
        // getToken(messaging, { vapidKey: 'BCPn2EvsuMpWLso5ZoqI_LPHMJAsC2QCUowTqS6_bMsteWOdHk7GVAi7_O1xlB-HY-XbmgdStx9YMxk0m2TcYSU' }).then((currentToken) => {
        //     if (currentToken) {
        //       // Send the token to your server and update the UI if necessary
        //       // ...
        //     } else {
        //       // Show permission request UI
        //       console.log('No registration token available. Request permission to generate one.');
        //       // ...
        //     }
        //   }).catch((err) => {
        //     console.log('An error occurred while retrieving token. ', err);
        //     // ...
        //   });
    }
    return(
        <>
        {success ? (
				 <section>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                }}>
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded mr-2"
                      alt=""
                    />
                    <strong className="mr-auto">Notification</strong>
                    <small>12 mins ago</small>
                  </Toast.Header>
                  <Toast.Body>There are some new updates that you might love!</Toast.Body>
                </Toast>
                 <h1>You are logged in!</h1>
                 <br />
                 <button onClick={onMessaging}>Message</button>
                 <button onClick={onSignOut}>Sign Out</button>
                 <p>{/* <a href="#">Go to Home</a> */}</p>
             </section>
			) : (
                <Login/>
            )
        }
        </>
    );
}
export default Home;