import { IconCall } from "@/components/ui/icons/IconCall";
import { IconCaptivePortal } from "@/components/ui/icons/IconCaptivePortal";
import { IconPinDrop } from "@/components/ui/icons/IconPinDrop";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ContactScreen = () => {
  const navigation = useNavigation();

  const contactRows = [
    {
      icon: <IconCaptivePortal />,
      text: "Liên hệ website: phongthuyminhtuan.com",
      onPress: () => Linking.openURL(`https://phongthuyminhtuan.com`),
    },
    {
      icon: <IconCall />,
      text: "Hotline hỗ trợ: 088 938 2868",
      onPress: () => Linking.openURL(`tel:0889382868`),
    },
    {
      icon: <IconPinDrop fill="#7B5C26" />,
      text: "Địa chỉ: 397-399 Lê Lợi, TP Bắc Giang",
      onPress: () =>
        Linking.openURL(
          `https://maps.google.com/?q=${encodeURIComponent(
            "397-399 Lê Lợi, TP Bắc Giang"
          )}`
        ),
    },
  ];

  const socialMedia = [
    {
      source: require("@/assets/images/bottomsheet/tiktok.png"),
      onPress: () => Linking.openURL(`https://www.tiktok.com/@thaytuanpt`),
    },
    {
      source: require("@/assets/images/bottomsheet/facebook.png"),
      onPress: () =>
        Linking.openURL(`https://www.facebook.com/Phongthuyminhtuanbg`),
    },
    {
      source: require("@/assets/images/bottomsheet/zalo.png"),
      onPress: () => Linking.openURL(`https://zalo.me/3868559906881276529`),
    },
    {
      source: require("@/assets/images/bottomsheet/youtube.png"),
      onPress: () =>
        Linking.openURL(`https://www.youtube.com/@Thaytuanphongthuy`),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>PHONG THUỶ MINH TUẤN</Text>
        </View>

        <View style={styles.rowsContainer}>
          {contactRows.map((row, index) => (
            <TouchableOpacity
              key={index}
              style={styles.row}
              onPress={row.onPress}
            >
              <View style={styles.iconContainer}>{row.icon}</View>
              <Text style={styles.rowText}>{row.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.socialMediaContainer}>
          {socialMedia.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialButton}
              onPress={item.onPress}
            >
              <Image source={item.source} style={styles.socialIcon} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            App La Bàn Thầy Tuấn dùng để đo tọa, hướng nhà qua vệ tinh và luận
            giải phong thủy nhà ở.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    paddingRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#7B5C26",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#7B5C26",
  },
  rowsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  iconContainer: {
    marginRight: 16,
  },
  rowText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  socialButton: {
    padding: 8,
  },
  socialIcon: {
    width: 48,
    height: 48,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default ContactScreen;
