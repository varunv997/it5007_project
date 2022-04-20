import React from 'react';
import '../../App.css';
import Footer from '../Footer';

function closeWindows() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log("Touch")
    }
  };
  xhttp.open("GET", "http://192.168.18.4:5000/close", true);
  xhttp.send();
}

function sendTouch() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log("Touch")
    }
  };
  xhttp.open("GET", "http://192.168.18.4:5000/touch", true);
  xhttp.send();
}

function startGame(gameName) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log("Touch")
    }
  };
  xhttp.open("GET", "http://192.168.18.4:5000/" + gameName, true);
  xhttp.send();
}

export default function Services(props) {
  closeWindows();
  startGame(props.match.params.gameName)
  return <><img width="100%" src="http://192.168.18.4:8080/getVideo?fps=120&cap=D3D11" onClick={sendTouch}/><Footer /></>
}