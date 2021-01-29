import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';
import 'firebase/storage'


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appID: process.env.REACT_APP_APP_ID,


};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.database = app.database();
        this.storage = app.storage();
    }
    video = uid => this.database.ref(`videos/${uid}`);
    videos = () => this.database.ref('videos');
    user = uid => this.database.ref(`users/${uid}`);
    users = () => this.database.ref('users');

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);
    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
// default empty roles
                        const dbUser = snapshot.val()
// merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    sortUserVideos = (uid) =>
        this.videos().orderByChild("uid").equalTo(uid).once('value', (snapshot) => {
        }).then((snapshot) => { return snapshot.val();})
    sortVideos = () =>
        this.videos().orderByChild("views").once('value', (snapshot) => {
        }).then((snapshot) => { return snapshot.val();})




}

export default Firebase;
