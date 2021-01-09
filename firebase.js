// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCYScmVTgqQkOB_QPvUPc9xLRhduh9csls",
    authDomain: "coupon-25588.firebaseapp.com",
    projectId: "coupon-25588",
    storageBucket: "coupon-25588.appspot.com",
    messagingSenderId: "745518642207",
    appId: "1:745518642207:web:5986deeac7c975a25f912a"
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

    //submit coupon data..
    if(msg.command == "post"){
      
      var domain = msg.data.domain;
      var enc_domain = btoa(domain);
      var code = msg.data.code;
      var desc = msd.data.desc;

      try{

        var newPost = firebase.database().ref('/domain/'+enc_domain).push().set({
          code: code,
          description: desc
        });

        var postId = newPost.key;
        response({type: "result", status: "success", data: postId, request: msg});

      }catch(e){
        console.log('error:', e);
        response({type: "result", status: "error", data: e, request: msg});

      }
    }

    return true;

  })