import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isNumberFinite } from "@/shared/validation";
import { geocodeAsync, reverseGeocodeAsync } from "expo-location";

interface SearchLocationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (location: SearchLocation) => void;
}

export interface SearchLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export default function SearchLocationModal({
  isVisible,
  onClose,
  onConfirm,
}: SearchLocationModalProps) {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SearchLocation | null>(
    null
  );

  const handleSearchLocation = async (text: string) => {
    setSearchText(text);

    // Clear suggestions when input is empty
    if (!text) {
      setSuggestions([]);
      return;
    }

    // Check if input is coordinates
    const [latitude, longitude] = text.split(",").map((item) => item.trim());
    if (
      latitude &&
      longitude &&
      isNumberFinite(latitude) &&
      isNumberFinite(longitude)
    ) {
      const location = {
        latitude: Number(latitude),
        longitude: Number(longitude),
      };
      try {
        const reverseGeocode = await reverseGeocodeAsync(location);
        if (reverseGeocode.length > 0) {
          const address = [
            reverseGeocode[0].street,
            reverseGeocode[0].district,
            reverseGeocode[0].city,
            reverseGeocode[0].country,
          ]
            .filter(Boolean)
            .join(", ");
          setSuggestions([{ ...location, address }]);
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      }
      return;
    }

    // Search for address
    try {
      const results = await geocodeAsync(text);
      const suggestionsWithAddress = await Promise.all(
        results.map(async (result) => {
          const { latitude, longitude } = result;
          const reverseGeocode = await reverseGeocodeAsync({
            latitude,
            longitude,
          });
          const address = reverseGeocode?.[0]?.formattedAddress;
          return { latitude, longitude, address };
        })
      );
      const nonNullSuggestions = suggestionsWithAddress.filter(
        (res) => res.address !== null
      ) as SearchLocation[];
      setSuggestions(nonNullSuggestions);
    } catch (error) {
      console.error("Error geocoding:", error);
    }
  };

  const handleSelectLocation = (location: SearchLocation) => {
    setSelectedLocation(location);
    setSearchText(location.address);
    setSuggestions([]);
  };

  useEffect(() => {
    if (!isVisible) {
      setSearchText("");
      setSuggestions([]);
      setSelectedLocation(null);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tìm vị trí</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tọa độ hoặc nhập địa chỉ để đến vị trí cần đo"
            placeholderTextColor="rgba(123, 92, 38, 0.2)"
            value={searchText}
            onChangeText={handleSearchLocation}
          />
          {suggestions.length > 0 && (
            <ScrollView style={styles.suggestionsContainer}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectLocation(suggestion)}
                >
                  <Text style={styles.suggestionText}>
                    {suggestion.address}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Huỷ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            disabled={!selectedLocation}
            onPress={() => {
              if (selectedLocation) {
                onConfirm(selectedLocation);
                onClose();
              }
            }}
          >
            <Text
              style={[
                styles.buttonText,
                styles.confirmButtonText,
                !selectedLocation && styles.disabledButtonText,
              ]}
            >
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  content: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Voltaire Regular",
    color: "#7B5C26",
    marginBottom: 20,
  },
  searchContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#7B5C26",
  },
  suggestionsContainer: {
    maxHeight: 200,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    marginTop: 4,
    position: "absolute",
    top: 40,
    zIndex: 100
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  suggestionText: {
    color: "#7B5C26",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Voltaire Regular",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FEC41F",
  },
  confirmButton: {
    backgroundColor: "#FEC41F",
  },
  cancelButtonText: {
    color: "#FEC41F",
  },
  confirmButtonText: {
    color: "#7B5C26",
  },
  disabledButtonText: {
    opacity: 0.5,
  },
});
