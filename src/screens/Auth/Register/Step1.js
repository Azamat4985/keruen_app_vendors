import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../theme/styles";
import CustomTextInput from "../../../components/CustomTextInput";
import StarRating from "react-native-star-rating";
import * as ImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { colors } from "../../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import locations, { regions } from "../../../helpers/regions";

const Step1 = ({ vendorData, setVendorData, avatar, setAvatar, route, setAvatarData }) => {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (route.params?.region) {
      setVendorData({ ...vendorData, region: route.params.region, city: "" });
    }
  }, [route.params?.region]);

  useEffect(() => {
    if (route.params?.city) {
      console.log(route.params.city);
      setVendorData({ ...vendorData, city: route.params.city });
    }
  }, [route.params?.city]);

  function nameHandler(text) {
    if (text.trim() != "" || vendorData.name.length == 1) {
      setVendorData({ ...vendorData, name: text });
    } else{
      setVendorData({ ...vendorData, name: '' });
    }
  }

  function addressHandler(text) {
    if (text.trim() != "" || vendorData.address.length == 1) {
      setVendorData({ ...vendorData, address: text });
    } else{
      setVendorData({ ...vendorData, address: '' });
    }
  }

  function descriptionHandler(text) {
    if (text.trim() != "" || vendorData.description.length == 1) {
      setVendorData({ ...vendorData, description: text });
    } else{
      setVendorData({ ...vendorData, description: '' });
    }
  }

  function selectHandler(type) {
    switch (type) {
      case "region":
        let regionNames = [];
        regions.map((i) => {
          regionNames.push(Object.keys(i)[0]);
        });
        navigation.navigate("Select", { title: "Область", data: regionNames, type: "region" });
        break;

      case "city":
        let cityNames = [];
        regions.map((i) => {
          if (Object.keys(i)[0] == vendorData.region) {
            cityNames = Object.values(i)[0];
          }
        });
        navigation.navigate("Select", { title: "Город", data: cityNames, type: "city" });
        break;

      default:
        break;
    }
  }

  async function imageSelectHandler() {
    const options = ["Выбрать фото", "Удалить", "Отмена"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      async (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.5,
            });

            setAvatar({ uri: result.assets[0].uri });
            setAvatarData(result.assets[0])
            break;

          case destructiveButtonIndex:
            setAvatar(require("../../../../assets/default_avatar.jpg"));
            setAvatarData(null)
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  }

  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <View>
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Название магазина</Text>
      <CustomTextInput
        placeholder={"Введите название магазина"}
        length={50}
        marginBottom={0}
        value={vendorData.name}
        setter={nameHandler}
      />

      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Описание магазина</Text>
      <CustomTextInput
        placeholder={"Введите описание магазина"}
        length={150}
        marginBottom={0}
        multiline={true}
        value={vendorData.description}
        setter={descriptionHandler}
      />

      <Text style={[GlobalStyles.text, { marginBottom: 15 }]}>Локация магазина</Text>
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity
          style={[GlobalStyles.selectBtn, { marginBottom: 10 }]}
          activeOpacity={0.7}
          onPress={() => {
            selectHandler("region");
          }}
        >
          <Text style={[GlobalStyles.text, { marginBottom: 0 }]}>Область</Text>
          <Text style={[GlobalStyles.smallText, { marginBottom: 0, color: colors.secondary }]}>{vendorData.region == "" ? "Не выбрано" : vendorData.region}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[GlobalStyles.selectBtn, { marginBottom: 10 }]}
          disabled={vendorData.region == "" ? true : false}
          activeOpacity={0.7}
          onPress={() => {
            selectHandler("city");
          }}
        >
          <Text style={[GlobalStyles.text, { marginBottom: 0 }, vendorData.region == "" ? GlobalStyles.disabledText : ""]}>Город</Text>
          <Text style={[GlobalStyles.smallText, { marginBottom: 0, color: colors.secondary }, vendorData.region == "" ? GlobalStyles.disabledText : ""]}>{vendorData.city == "" ? "Не выбрано" : vendorData.city}</Text>
        </TouchableOpacity>

        <CustomTextInput
          placeholder={"Введите адрес магазина"}
          length={100}
          value={vendorData.address}
          setter={addressHandler}
        />
      </View>

      <Text style={[GlobalStyles.text, { marginBottom: 20 }]}>Предпросмотр</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={imageSelectHandler}
        >
          <View style={{ position: "relative" }}>
            <Image
              source={avatar}
              style={{ width: 100, height: 100, resizeMode: "cover", borderRadius: 100 }}
            />
            <View style={{ position: "absolute", width: 100, height: 100, top: 0, left: 0, backgroundColor: "rgba(0,0,0, 0.2)", borderRadius: 100, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Image
                source={require("../../../../assets/img_icon.png")}
                style={{ width: 50, height: 50, resizeMode: "contain", opacity: 0.8 }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginStart: 15, flex: 1 }}>
          <Text style={[GlobalStyles.text, { fontFamily: "Rubik-Medium", fontSize: 22, marginBottom: 5 }]}>{vendorData.name == "" ? "Название магазина" : vendorData.name}</Text>
          <Text style={[GlobalStyles.text, { flexShrink: 1, fontSize: 16, marginBottom: 10 }]}>{vendorData.description == "" ? "Описание магазина" : vendorData.description}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <StarRating
              maxStars={5}
              rating={4.5}
              starSize={20}
              fullStarColor="#fabf1b"
              containerStyle={{ width: 100 }}
            />
            <Text style={{ marginStart: 10, color: "#666666" }}>(46)</Text>
          </View>
          <Text style={[GlobalStyles.smallText, { color: "#666666" }]}>
            {vendorData.city}, {vendorData.region}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step1;
