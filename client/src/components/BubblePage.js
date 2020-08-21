import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAPI } from '../hooks/useAPI'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [data, moveData, error] = useAPI({
    method: 'get',
    url: '/api/colors',
    data: ''
  })

  useEffect(() => {
    moveData()
    .then( res => {
      // console.log(res)
      setColorList(res)
    })
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
