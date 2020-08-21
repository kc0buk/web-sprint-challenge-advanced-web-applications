import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAPI } from '../hooks/useAPI'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { fetchColors } from '../api/fetchColors'


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

  // useEffect(() => {
  //   moveData()
  //   .then( res => {
  //     // console.log(res)
  //     setColorList(res)
  //   })
  // }, [])

  useEffect(() => {
    fetchColors()
      // .get('/api/colors')
      .then( res => {
        console.log(res)
        setColorList(res.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
