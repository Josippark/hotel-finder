import React, { Component } from 'react';
import classes from './Main.module.scss';
import Search from '../components/Search/Search';
import CardWrapper from '../components/CardWrapper/CardWrapper';
import { connect } from 'react-redux';
import Spinner from '../util/Spinner/Spinner.js'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Heading from '../components/Heading/Heading'


const config = {
    apiKey: 'AIzaSyAY5gdwdpIe16HTAcv8vIEHwI40Xhq_Wn0',
    authDomain: 'adv-web-programming.firebaseapp.com',

};

firebase.initializeApp(config);

class Main extends Component {


    state = {
        isSignedIn: false // Local signed-in state.
    };

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,

        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false
        }
    };
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({ isSignedIn: !!user })
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {

        const login = (
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        )

        const search = (
            <div>
                <section className={classes['Search']}>
                    <Search />
                </section>
                <section className={classes['Card-wrapper']}>
                    {this.props.isLoading ? <Spinner /> : <CardWrapper />}
                </section>
            </div>
        )
        let user = 'test'
        if(this.state.isSignedIn){
             user = firebase.auth().currentUser.displayName;
        }
        const signOut = (
            <div style={{marginTop:'.5rem', position: 'absolute', width:'100vw' }}>
                <span style= {{marginLeft:'2rem',color:'white'}}>Welcome, {user} </span><span className={classes['SignOut']}><button  className={classes['Button-logout']} onClick={() => firebase.auth().signOut()}>Sign out</button></span>
                <hr></hr>
            </div>)
        return (
            <div>


                <section className={classes['Main']}>
                {!this.state.isSignedIn ? null : signOut}
                    <Heading />
                    {!this.state.isSignedIn ? login : search}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(Main);