import axios from "axios";

const baseUrl = "https://localhost:44335/api"
const axiosOptions = {
  baseURL: baseUrl
};

const client = axios.create(axiosOptions);

function errorResponseHandler(error: any, onError: any) {
    if(error.response) {
        onError(error.response.data);
        console.log('axios unhandled exception', error);
      
    }
  }
  
  export function getData(path: any, onSuccess: any, onError: any) {
    return client.get(path)
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((err) => {
        errorResponseHandler(err, onError);
      })
  }
  
  export function postData(path: any, payload: any, onSuccess: any, onError: any) {
    client
        .post(path, payload)
        .then((response) => {
          onSuccess(response.data);
        })
        .catch((err) => {
          errorResponseHandler(err, onError);
        })
  }