import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconClose } from "@/components/ui/icons/IconClose";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { RouteProp } from "@react-navigation/native";

type ImagePickerModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ImagePickerModal"
>;

type ImagePickerModalRouteProp = RouteProp<RootStackParamList, "ImagePickerModal">;

interface ImagePickerModalProps {
  navigation: ImagePickerModalNavigationProp;
  route: ImagePickerModalRouteProp;
}

export default function ImagePickerModal({ navigation, route }: ImagePickerModalProps) {
  const handleCameraLaunch = async () => {
    const result = await launchCamera({
      mediaType: "photo",
      quality: 1,
    });

    if (result.assets && result.assets[0]?.uri) {
      navigation.popTo(route.params.from, {
        uri: result.assets[0].uri,
      } as any);
    }
  };

  const handleGalleryLaunch = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 1,
    });

    if (result.assets && result.assets[0]?.uri) {
      navigation.popTo(route.params.from, {
        uri: result.assets[0].uri,
      } as any);
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Image</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconContainer>
              <IconClose />
            </IconContainer>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCameraLaunch}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGalleryLaunch}
        >
          <Text style={styles.buttonText}>Choose from Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#C81B22",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
}); 