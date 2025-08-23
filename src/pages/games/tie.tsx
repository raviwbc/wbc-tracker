import React, { useEffect, useState } from "react";

export default function Tie() {
  let arrayList = [
    [2, 2, 3],
    [3, 3, 3],
    [2, 3, 2],
  ];

  const [dataTransfer, updateData] = useState(arrayList);

  function checkMatch() {
    let xlength = dataTransfer.length;
    let ylength = dataTransfer[0].length;
    for (let i = 0; i < xlength; i++) {
      let checkSet = new Set();
      for (let j = 0; j < xlength; j++) {
        if (dataTransfer[i][j] == 1) {
          checkSet.add(j + 10);
        } else if (checkSet.has(dataTransfer[i][j]) == false) {
          checkSet.add(dataTransfer[i][j]);
        }
      }

      if (checkSet.size == 1) {
        alert("you won hor wise");
      }
    }
    let lowerLength = xlength < ylength ? xlength : ylength;
    for (let k = 0; k < lowerLength; k++) {
      let checkSet = new Set();
      for (let m = 0; m < lowerLength; m++) {
        if (dataTransfer[m][k] == 1) {
          checkSet.add(m + 10);
        } else if (checkSet.has(dataTransfer[m][k]) == false) {
          checkSet.add(dataTransfer[m][k]);
        }
      }

      if (checkSet.size == 1) {
        alert("you  ver wise");
      }
    }
    let toplefttobuttom = new Set();
    for (let n = 0; n < lowerLength; n++) {
      if (dataTransfer[n][n] == 1) {
        toplefttobuttom.add(n + 10);
      } else if (toplefttobuttom.has(dataTransfer[n][n]) == false) {
        toplefttobuttom.add(dataTransfer[n][n]);
      }
    }

    if (toplefttobuttom.size == 1) {
      alert("you  toptoleft wise");
    }
    let toprighttobuttom = new Set();

    for (let i = 2; 0 <= i; i--) {
      if (dataTransfer[i][2 - i] == 1) {
        toprighttobuttom.add(2 - i + 10);
      } else if (toprighttobuttom.has(dataTransfer[i][2 - i]) == false) {
        toprighttobuttom.add(dataTransfer[i][2 - i]);
      }
    }

    if (toprighttobuttom.size == 1) {
      alert("you  toprighttobuttom wise");
    }
  }

  return (
    <>
      <button onClick={checkMatch}>click</button>
    </>
  );
}
