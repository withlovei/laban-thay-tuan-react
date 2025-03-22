import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { IconClose } from "@/components/ui/icons/IconClose";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconInventory } from "@/components/ui/icons/IconInventory";
import { SectionItem } from "@/app/table-of-contents-modal/components/SectionItem";
import { Background } from "@/app/table-of-contents-modal/components/Background";

interface Section {
  title: string;
  icon: React.ReactNode;
  pageIndex: number;
}
const sections: Section[] = [
  { title: "Khái niệm cơ bản", icon: <IconInventory />, pageIndex: 13 },
  { title: "Cung mệnh phong thuỷ", icon: <IconInventory />, pageIndex: 19 },
  {
    title: "Hướng nhà trong phong thuỷ",
    icon: <IconInventory />,
    pageIndex: 21,
  },
  {
    title: "24 sao trong vòng sao Phúc Đức",
    icon: <IconInventory />,
    pageIndex: 23,
  },
  {
    title:
      "Trình tự các bước tự kiểm tra phong thủy hướng nhà tốt xấu một cách nhanh nhất",
    icon: <IconInventory />,
    pageIndex: 37,
  },
  {
    title: "Bảng tra cứu sự tác động vòng 24 sơn hướng theo năm sinh",
    icon: <IconInventory />,
    pageIndex: 45,
  },
  { title: "Cách hóa giải", icon: <IconInventory />, pageIndex: 225 },
  {
    title: "Câu chuyện thực tế kiểm tra cát hung tại vị trí mở cửa",
    icon: <IconInventory />,
    pageIndex: 233,
  },
];

type TableOfContentsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "TableOfContents">;
};
export default function TableOfContentsScreen({
  navigation,
}: TableOfContentsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <Background />
        <IconContainer
          style={styles.closeButton}
          width={24}
          height={24}
          onPress={() => navigation.goBack()}
        >
          <IconClose />
        </IconContainer>
        <FlatList
          data={sections}
          renderItem={({ item }) => (
            <SectionItem
              onPress={() => {
                navigation.popTo("MinhTuanBookPDF", {
                  page: item.pageIndex,
                });
              }}
              title={item.title}
              Icon={item.icon}
            />
          )}
          scrollEnabled={false}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C81B22",
  },
  scrollView: {
    // flex: 1,
    minHeight: "100%",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 12,
  },
  list: {
    marginTop: 36,
    marginHorizontal: 16,
    marginBottom: 381,
  },
  separator: { height: 1, backgroundColor: "#2F3035", opacity: 0.05 },
});
