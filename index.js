 // Client ID and API key from the Developer Console
 var CLIENT_ID = '386580159833-aqcr073orsalvjkrkavmdd0igbum2mra.apps.googleusercontent.com';
 var API_KEY = 'AIzaSyAcUSQhEcbj_33878C1jzC66tyctgIBDs4';

 // Array of API discovery doc URLs for APIs used by the quickstart
 var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
 var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

 var authorizeButton = document.getElementById('authorize_button');
 var signoutButton = document.getElementById('signout_button');

 /**
  *  On load, called to load the auth2 library and API client library.
  */
 function handleClientLoad() {
   gapi.load('client:auth2', initClient);
 }

 /**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */
 function initClient() {
   gapi.client.init({
     apiKey: API_KEY,
     clientId: CLIENT_ID,
     discoveryDocs: DISCOVERY_DOCS,
     scope: SCOPES
   }).then(function () {
     // Listen for sign-in state changes.
     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

     // Handle the initial sign-in state.
     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
     authorizeButton.onclick = handleAuthClick;
     signoutButton.onclick = handleSignoutClick;
   }, function(error) {
     appendPre(JSON.stringify(error, null, 2));
   });
 }

 /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
 function updateSigninStatus(isSignedIn) {
   if (isSignedIn) {
     authorizeButton.style.display = 'none';
     signoutButton.style.display = 'block';
     listLabels();
   } else {
     authorizeButton.style.display = 'block';
     signoutButton.style.display = 'none';
   }
 }

 /**
  *  Sign in the user upon button click.
  */
 function handleAuthClick(event) {
   gapi.auth2.getAuthInstance().signIn();
 }

 /**
  *  Sign out the user upon button click.
  */
 function handleSignoutClick(event) {
   gapi.auth2.getAuthInstance().signOut();
 }

 /**
  * Append a pre element to the body containing the given message
  * as its text node. Used to display the results of the API call.
  *
  * @param {string} message Text to be placed in pre element.
  */
 function appendPre(message) {
   var pre = document.getElementById('content');
   var textContent = document.createTextNode(message + '\n');
   pre.appendChild(textContent);
 }

 /**
  * Print all Labels in the authorized user's inbox. If no labels
  * are found an appropriate message is printed.
  */
 function listLabels() {
   gapi.client.gmail.users.labels.list({
     'userId': 'gokulrajana@gmail.com'
   }).then(function(response) {
     var labels = response.result.labels;
     appendPre('Labels1:');

     if (labels && labels.length > 0) {
       for (i = 0; i < labels.length; i++) {
         var label = labels[i];
         appendPre(label.name);
           
        
       }
       console.log(labels);
     } else {
       appendPre('No Labels found.');
     }
   });
 }
// let inbox=document.querySelector(".inbox")
// const read=
const read= async ()=>
{
  try{
    await fetch(' https://gmail.googleapis.com/gmail/v1/users/gokulrajana@gmail.com/inbox',{method:"GET",
  headers:{ OAuth2accesstoken:CLIENT_ID}}).
    then((res)=>res.json()).
    then((res)=>console.log(res));
  }
  catch(error){
    console.log('Looks like there was a problem: ', error);
  }

}
function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.gmail.users.getProfile({
    "userId": "gokulrajana@gmail.com"
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: CLIENT_ID});
});

function messages() {
  return gapi.client.gmail.users.messages.list({
    "userId": "gokulrajana@gmail.com",
    "includeSpamTrash": true
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log(response);
            },
            function(err) { console.error("Execute error", err); });

}


