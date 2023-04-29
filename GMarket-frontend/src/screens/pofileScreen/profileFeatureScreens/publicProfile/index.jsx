import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import style from "./style";
import Avatar from "../../../../components/Avatar";
import PosterInfo from "../../../../components/PosterInfo";
import PersonRating from "../../../../components/Rating";
import PosterCard from "../../../../components/PosterCard";
import UseHttp from "../../../../hooks/http-hook";
import { useSelector } from "react-redux";
const PublicProfile = () => {
  const [error,isLoading,sendRequest] = UseHttp()
  const auth = useSelector(state => state.auth)
  const [rating,setRating] = useState(0)
  const [posters,setPosters] = useState([])
  useEffect(() =>{
    const fetshData = async() => {
      // const phone
      // const response = await sendRequest("user/add_rate")
    }
  })
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={{ width: 70, height: 70 }}>
          <Avatar uri="https://picsum.photos/id/1006/500/500" />
        </View>
        <View style={style.info}>
          <Text style={style.name}>ALI Janbein</Text>
          <Text style={style.name}>[Farmer]</Text>
        </View>
      </View>
      <View style={style.line} />
      {/* <PosterInfo keyname = "Rate" val = "4.5/5"/> */}
      <PersonRating/>
      <View style={style.line} />
      <Text style={style.posters}>Published Posters:</Text>
      <ScrollView style = {{marginTop:10}} contentContainerStyle ={{paddingBottom:40}} >
          <PosterCard/>
          <PosterCard/>
          <PosterCard/>
          <PosterCard/>
      </ScrollView>
      
    </View>
  );
};

export default PublicProfile;
