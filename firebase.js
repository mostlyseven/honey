var firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxx",
    authDomain: "xyz01-4f088.firebaseapp.com",
    projectId: "xyz01-4f088",
    storageBucket: "xyz01-4f088.appspot.com",
    messagingSenderId: "770278087701",
    appId: "1:770278087701:web:62d47b55a62538c6da421c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log(firebase);

  chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if(msg.command == "fetch"){
    var domain = msg.data.domain;
    var enc_domain = btoa(domain);
    firebase.database().ref('/domain/'+enc_domain).once('value').then(function(snapshot){
        response({type: "result", status: "success", data: snapshot.val(), request: msg});
    });

}

    return true;


  })
