import React, {Component, createRef} from 'react';
import {Button, Modal} from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import {firebaseConfig, googleProvider} from '../../config/firebase';

class InputField extends Component {
    render() {
        const {label, type, value, onChange} = this.props;

        return (
            <div className="md-form mb-5">
                <label data-error="wrong" data-success="right" htmlFor={`defaultForm-${type}`}>
                    {label}
                </label>
                <input
                    type={type}
                    className="form-control validate"
                    id={`defaultForm-${type}`}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            email: '',
            password: '',
        };
        this.modalRef = createRef(); // Create a ref for Modal
    }

    signIn = async () => {
        const {email, password} = this.state;

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('User signed in:', email);
            this.handleClose();
        } catch (error) {
            console.error('Sign In Error:', error.message);
        }
    };

    signUp = async () => {
        const {email, password} = this.state;
        const apiKey = firebaseConfig.apiKey;
        const signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

        try {
            const response = await fetch(signUpEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            });

            const data = await response.json();

            // Handle the response data (data contains the user ID token, etc.)
            console.log('Sign-up response:', data);

            // You might want to check for errors in the response and handle them appropriately
            if (!response.ok) {
                throw new Error(data.error.message);
            }

            // Additional actions after successful sign-up
        } catch (error) {
            console.error('Sign-up error:', error.message);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    signInWithGoogle = async () => {
        try {
            // Trigger the Google Sign-In popup
            const result = await signInWithPopup(auth, provider);
            // Access the user information from the result
            const user = result.user;
            // Additional actions after successful Google Sign-In
            console.log('Google Sign-In Successful. User:', user);
        } catch (error) {
            console.error('Google Sign-In Error:', error.message);
        }
    };


    logOut = async () => {
        try {
            await firebase.auth().signOut();
            console.log('User signed out');
        } catch (error) {
            console.error('Sign Out Error:', error.message);
        }
    };

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    handleShow = () => this.setState({show: true});
    handleClose = () => this.setState({show: false});

    render() {
        const {show, email, password} = this.state;

        return (
            <>
                <div className="d-flex mb-3 justify-content-end sign-in" onClick={this.handleShow}>
                    Sign In / Sign Up
                </div>

                <Modal ref={this.modalRef} show={show} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputField label="Your email" type="email" value={email}
                                    onChange={(e) => this.setState({email: e.target.value})}/>
                        <InputField
                            label="Your password"
                            type="password"
                            value={password}
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.signIn}>
                            Sign In
                        </Button>
                        <Button variant="primary" onClick={this.signUp}>
                            Sign Up
                        </Button>
                        {/*<Button variant="primary" onClick={this.signInWithGoogle}>*/}
                        {/*    Sign In with Google*/}
                        {/*</Button>*/}
                        <Button variant="warning" onClick={this.logOut}>
                            Log Out
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Auth;
