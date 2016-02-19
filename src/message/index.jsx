import 'bfd-bootstrap'
import './main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

const defaultDuration = 2;

function buildDom(infoClass,content){
  const fDiv = document.createElement('div');
  const cDiv = document.createElement('div');
  fDiv.className = 'alert-message';
  cDiv.className = 'alert alert-'+infoClass+'';
  cDiv.innerHTML = content;
  fDiv.appendChild(cDiv);
  document.body.appendChild(fDiv);
}

function closeDom(){
  var div = document.getElementsByClassName('alert-message')[0];
  document.body.removeChild(div);
}

function notice(content,duration,infoClass){
  if(duration === undefined){
    duration = defaultDuration
  }
  buildDom(infoClass,content);
  setTimeout(closeDom, duration*1000)
}

export default {
  info(content, duration) {
    return notice(content, duration, 'info' );
  },
  success(content, duration) {
    return notice(content, duration, 'success');
  },
  danger(content, duration) {
    return notice(content, duration, 'danger');
  },
  warning(content, duration) {
    return notice(content, duration, 'warning');
  }
}
