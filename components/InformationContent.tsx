import { screen } from "@/constants/Dimensions";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

type Props = {
  title: string;
  rows: {
    icon: React.ReactNode;
    text: string;
    onPress: () => void;
  }[];
  images?: {
    source: ImageSourcePropType;
    onPress: () => void;
  }[];
  description?: string;
};

export const InformationContent: React.FC<Props> = ({
  title,
  rows,
  images,
  description,
}) => {
  return (
    <View>
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <View style={styles.imageGrid}>
          {images?.map((image, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={image.onPress}
              style={styles.imageWrapper}
            >
              <Image
                source={image.source}
                style={styles.gridImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactInfo}>
          {rows.map((row, index) => (
            <TouchableOpacity
              key={index}
              style={styles.infoRow}
              onPress={row.onPress}
            >
              <View style={styles.iconContainer}>{row.icon}</View>
              <Text style={styles.infoText}>
                {row.text
                  .split(
                    /(\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\/[^\s]*)?\b)/
                  )
                  .map((part, i) => {
                    const isWebsite =
                      /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\/[^\s]*)?\b/.test(
                        part
                      );
                    return isWebsite ? (
                      <Text
                        key={i}
                        style={[styles.infoText, styles.websiteText]}
                      >
                        {part}
                      </Text>
                    ) : (
                      <Text key={i} style={styles.infoText}>
                        {part}
                      </Text>
                    );
                  })}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {description && (
        <View style={styles.section}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    color: "#212121",
    fontFamily: "Roboto Condensed Bold",
  },
  imageGrid: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 4,
  },
  imageWrapper: {
    borderRadius: 500,
    width: (screen.width - 40) / 4,
    height: (screen.width - 40) / 4,
  },
  gridImage: {
    width: "100%",
    height: "100%",
    borderRadius: 500,
    borderWidth: 2,
    borderColor: "rgba(254, 196, 31, 0.5)",
  },
  contactInfo: {
    gap: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#7C5C26",
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#553D13",
    flex: 1,
    fontFamily: "Roboto Condensed",
  },
  description: {
    fontSize: 14,
    color: "#553D13",
    lineHeight: 20,
    fontFamily: "Roboto Condensed",
  },
  websiteText: {
    color: "#0080CA",
  },
});
