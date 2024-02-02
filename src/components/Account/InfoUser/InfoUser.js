import React from "react";
import { View } from "react-native";
import { Avatar, Text } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { styles } from "./InfoUser.styles";

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoUrl, displayName, email } = getAuth().currentUser;

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowEditing: true,
      aspect: [4, 3],
    });

    //console.log("Iniciando conversion a blob...");
    //console.log(result);
    if (!result.canceled) uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (uri) => {
    setLoadingText("Subiendo imagen de perfil");
    setLoading(true);
    //console.log(uri);
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);
    //console.log("Iniciando carga...");
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
      console.log(snapshot);
    });
  };

  const updatePhotoUrl = (imagePath) => {
    console.log(imagePath);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: photoUrl }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
