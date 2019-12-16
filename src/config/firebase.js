
import firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyDc6zIgLFQVtj08drA-ePGEacIL-g8UOkc",
    authDomain: "benjamin-region-hongkong.firebaseapp.com",
    databaseURL: "https://benjamin-region-hongkong.firebaseio.com",
    projectId: "benjamin-region-hongkong",
    storageBucket: "benjamin-region-hongkong.appspot.com",
    messagingSenderId: "552614767644",
    paginate:{
        p:0,
        offset:0,
        max:100,
        is_deleted:0,
        key:''
    },
};
firebase.initializeApp(config);

//export const database = firebase.database();
//export const auth = firebase.auth();
//export const provider = new firebase.auth.FacebookAuthProvider();
export const fireStorage = firebase.storage();
