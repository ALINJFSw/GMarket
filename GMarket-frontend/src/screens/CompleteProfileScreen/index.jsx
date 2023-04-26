import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../contansts/colors";
import InputForm from "../../components/inputForm";
import PassButton from "../../components/passButton";
import { login } from "../../redux/slices/authSlice";
import UseHttp from "../../hooks/http-hook";
import LoadingOverlay from "../../components/loadingOverlay";

const CompleteProfileScren = () => {
  const auth = useSelector((state) => state.auth);
  const [imageURI, setImageUri] = useState("");
  const [bio, setBio] = useState();
  const [saveAble, setSaveAble] = useState(false);
  const dispatch = useDispatch();
  const [error, isLoading, sendRequest] = UseHttp();
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
      console.log(pickerResult.assets[0].uri);
    }
  };

  const bioHandler = (text) => {
    console.log(text);
    setBio(text);
  };

  useEffect(() => {
    if (!!bio && !!imageURI) {
      console.log("yse");
      setSaveAble(true);
    }
  }, [bio, imageURI]);

  // // const sendHandler = async () => {

  //
  // // }

  const finishHandler = async () => {
    let uriParts = imageURI.split(".");
    let fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("phone_number", "961" + authSlice.phoneNumber);
    formData.append("image",{
      uri:imageURI,
      type:"image/"+fileType,
      name:"profile"+auth.phoneNumber +fileType
    });
    const response = await sendRequest("auth/complet_profile","POST",formData)
    if(response.status == "sucess"){
      console.log(response.user);
      dispatch(login())
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingOverlay />}
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={styles.imageContainer}
        >
          {!!imageURI && (
            <Image
              style={styles.image}
              source={{
                uri: `${imageURI}`,
              }}
            />
          )}
          {!!!imageURI && <Text style={styles.buttonText}>+Add Image</Text>}
        </TouchableOpacity>
        <View>
          <InputForm onTextChange={bioHandler} label="Bio" bio invalid={true} />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <PassButton
          onPress={() => {
            dispatch(login());
          }}
          active={!saveAble}
          title={"skip"}
        />
        <Text></Text>
        <PassButton onPress={finishHandler} active={saveAble} title="finish" />
      </View>
    </View>
  );
};

export default CompleteProfileScren;

// uri: result.uri,
// name: 'myImage.jpg',
// type: 'image/jpeg'
