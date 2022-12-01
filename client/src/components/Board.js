import React, { Component, useRef, useState } from "react";
import "../styles/boardInformations.scss";
import Countdown from "react-countdown";


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: {},
    };
    }
    
    componentDidMount() {
        	fetch("/boards")
            .then((res) => res.json())
                .then((data) => {
                 this.setState({ boardData: data });
              console.log(data);
            });
    }

  render() {
        const { boardData } = this.state
        const { 
          title, 
          author,
        } = boardData;
    return (
      <div>
            <h1>Ici la liste des boards crées</h1>
            <table>
                
            </table>
        <h1>{title}</h1>
        <h2>{author}</h2>
      </div>
    );
  }
}



 
 
