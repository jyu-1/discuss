import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBlDRveiDAc2HoaUEShgecHmbNRwjW7954",
    authDomain: "discuss-appp.firebaseapp.com",
    projectId: "discuss-appp",
    storageBucket: "discuss-appp.appspot.com",
    messagingSenderId: "569116069564",
    appId: "1:569116069564:web:79604eb821c301f4438ab9",
    measurementId: "G-5VW48B16Y7",
    databaseURL: "https://discuss-appp-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
