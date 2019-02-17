import Fb from "firebase";

const config = {
  apiKey: "AIzaSyBO6oRd0PV4JKubkp1tc3YLRRk3SzQCiX8",
  authDomain: "crcl-ed2d3.firebaseapp.com",
  databaseURL: "https://crcl-ed2d3.firebaseio.com",
  projectId: "crcl-ed2d3",
  storageBucket: "crcl-ed2d3.appspot.com",
  messagingSenderId: "603594399106"
};

const FirebaseConfig = Fb.initializeApp(config);

export default FirebaseConfig;
