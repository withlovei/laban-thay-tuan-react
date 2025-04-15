import { IconBar } from "@/components/ui/icons/IconBar";
import { useSidebar } from "@/contexts/SidebarContext";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const NavigationBar: FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { showSidebar } = useSidebar();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBar} onPress={showSidebar}>
        <IconBar />
      </TouchableOpacity>
      <Text style={styles.title}>LA BÀN THẦY TUẤN</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    marginHorizontal: 16,
    marginTop: 24,
  },
  iconBar: {
    position: "absolute",
    left: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: "#7B5C26",
    fontSize: 20,
    fontFamily: "UTM Impact",
    backgroundColor: "#FEC41F",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
