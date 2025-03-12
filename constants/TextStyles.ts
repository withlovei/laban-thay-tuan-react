import { TextStyle } from "react-native";

type TextStyleKey = "displayLarge" | "displayMedium" | "displaySmall" | "headlineLarge" | "headlineMedium" | "headlineSmall" | "titleLarge" | "titleMedium" | "titleSmall" | "labelLarge" | "labelMedium" | "labelSmall" | "bodyLarge" | "bodyMedium" | "bodySmall";

export const TextStyles: Record<TextStyleKey, TextStyle> = {
  displayLarge: {
    fontFamily: "SpaceMono",
    fontWeight: "semibold",
    fontSize: 57.0,
  },
  displayMedium: {
    fontFamily: "SpaceMono",
    fontWeight: "semibold",
    fontSize: 45.0,
  },
  displaySmall: {
    fontFamily: "SpaceMono",
    fontWeight: "semibold",
    fontSize: 36.0,
  },
  headlineLarge: {
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    fontSize: 32.0,
  },
  headlineMedium: {
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    fontSize: 28.0,
  },
  headlineSmall: {
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    fontSize: 24.0,
  },
  titleLarge: {
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    fontSize: 22.0,
  },
  titleMedium: {
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    fontSize: 16.0,
  },
  titleSmall: {
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    fontSize: 14.0,
  },
  labelLarge: {
    fontFamily: "SpaceMono",
    fontWeight: "medium",
    fontSize: 14.0,
  },
  labelMedium: {
    fontFamily: "SpaceMono",
    fontWeight: "medium",
    fontSize: 12.0,
  },
  labelSmall: {
    fontFamily: "SpaceMono",
    fontWeight: "medium",
    fontSize: 11.0,
  },
  bodyLarge: {
    fontFamily: "SpaceMono",
    fontWeight: "regular",
    fontSize: 16.0,
  },
  bodyMedium: {
    fontFamily: "SpaceMono",
    fontWeight: "regular",
    fontSize: 14.0,
  },
  bodySmall: {
    fontFamily: "SpaceMono",
    fontWeight: "regular",
    fontSize: 12.0,
  },
};
