import React, { useRef, useState } from "react";
import "../styles/boardInformations.scss";
import Countdown from "react-countdown";

export default function boardInformations(props) {
  const { width, height, title, startDate, author, endDate, delaiSecondes } =
    props;


  return (
      <div>
          <h1>Ici la liste des boards crées</h1>
    </div>
  );
}
