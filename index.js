const express = require("express");
const app = express();
const axios = require("axios");
const {GoogleAuth} = require('google-auth-library');


const API_URL = "https://api.example.com";
const IAP_CLIENT_ID = "";
const CLIENT_SECRET_KEY_FILE = "";


const targetAudience = `${IAP_CLIENT_ID}.apps.googleusercontent.com`;
const auth = new GoogleAuth({
  keyFile : CLIENT_SECRET_KEY_FILE
});

async function getIAPClient() {
  console.info(`request IAP ${url} with target audience ${targetAudience}`);
  const client = await auth.getIdTokenClient(targetAudience);
  return await client.getRequestHeaders();
}




/*
  we can check 

*/

app.get("/test", async (req, res) => {
  try {

    const iap = await getIAPClient();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Auth: `Bearer ${iap}`,
      }
    };

    const response = await axios.get(`${API_URL}/test`,config);
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/test", async (req, res) => {
  try {

    const iap = await getIAPClient();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Auth: `Bearer ${iap}`,
      }
    };


    const response = await axios.post(`${API_URL}/test`,config);
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/commvault", async (req, res) => {
  try {
    const iap = await getIAPClient();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Auth: `Bearer ${iap}`
      },
      data: {
        token: "",
        prefix: "",
      },
    };

    const response = await axios.post(`${API_URL}/commvault`, config);
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});


app.get("/commvault/login", async (req, res) => {
  try {
    const iap = await getIAPClient();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Auth: `Bearer ${iap}`,
      }
    };

    const response = await axios.get(`${API_URL}/commvault/login`,config);
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
