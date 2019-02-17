import RNFetchBlob from "react-native-fetch-blob";
import firebase from "firebase";
import { Platform } from "react-native";

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const uploadImage = (uri, imageName, mime = "image/jpg") =>
  new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    let uploadBlob = null;
    const imageRef = firebase
      .storage()
      .ref("images")
      .child(imageName);
    fs
      .readFile(uploadUri, "base64")
      .then(data => Blob.build(data, { type: `${mime};BASE64` }))
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });

export default uploadImage;
