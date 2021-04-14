//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
    apiKey: "AIzaSyA0Hkn9sa6sb_U9nTWTUjgcqY0DPSBrz8w",
    authDomain: "classtest-c96b9.firebaseapp.com",
    databaseURL: "https://classtest-c96b9-default-rtdb.firebaseio.com",
    projectId: "classtest-c96b9",
    storageBucket: "classtest-c96b9.appspot.com",
    messagingSenderId: "8967930635",
    appId: "1:8967930635:web:d5a5d222a06a0d9ca5180e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code

//End code
      } });  }); }
getData();

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({name: user_name, message: msg, like:0});
      document.getElementById("msg").value = "";
}

function getData() {
   firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
   document.getElementById("output").innerHTML = ""; 
   snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; 
   childData = childSnapshot.val(); if(childKey != "purpose") { firebase_message_id = childKey; 
   message_data = childData;

   //Start code 
   console.log(firebase_message_id);
   console.log(message_data);
   name = message_data ["name"];
   message = message_data ["message"];
   like = message_data ["like"];
   name_withTag = "<h4>" + name + "<img class='user_tick' src='user_tick.jpeg'></h4>";
   message_withTag = "<h4 class='message_h4'>" + message + "</h4>";
   likeButton = "<button class='btn btn-warning' id='" + firebase_message_id + "'value = '" + like + "'onclick='updateLike(this.id)'>";
   span_withTag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

   row = name_withTag + message_withTag + likeButton + span_withTag;
   document.getElementById("output").innerHTML += row;
   //End code

   } }); }); } 
   getData();

   function updateLike(message_id) {
      console.log("Click on like button" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updatedLikes = Number(likes) + 1;
      console.log(updatedLikes);
      firebase.database().ref(room_name).child(message_id).update({like: updatedLikes});
   }

function Logout() {
      localStorage.getItem(room_name);
      localStorage.getItem(user_name);
      window.location = "index.html";
}
