import { BOTTOM_BAR_HEIGHT, screen } from "@/constants/Dimensions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookPDFViewer from "./pdf-viewer";

const Stack = createStackNavigator();

interface Book {
  id: number;
  name: string;
  url: string;
  published: boolean;
  imageUrl: string;
}

const BooksScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://cms.labanthaytuan.vn/api/books-public"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Không thể tải danh sách sách. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  const navigation = useNavigation<any>();

  const openBook = (book: Book) => {
    navigation.navigate("BookPDFViewer", {
      url: book.url,
      title: book.name,
    });
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => openBook(item)}
      activeOpacity={0.7}
    >
      <View style={styles.bookCard}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
        ) : (
          <View style={styles.defaultBookIcon}>
            <Ionicons name="book" size={50} color="#7B5C26" />
          </View>
        )}
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#7B5C26" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchBooks}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Tôi là Nguyễn Đình Tuấn, một chuyên gia phong thủy với gần 10 năm
            kinh nghiệm tư vấn và nghiên cứu trong lĩnh vực này. Hành trình của
            tôi không chỉ là hành trình của tri thức, mà còn là hành trình của
            tâm huyết, của niềm tin vào những giá trị phong thủy mang lại cho
            cuộc sống con người.
          </Text>
          <Text style={styles.introText}>
            Các sách dưới đây đều được tôi dày công nghiên cứu và đúc kết lại
            qua nhiều quá trình thực tiễn.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Danh sách sách</Text>

        {books.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có sách nào</Text>
          </View>
        ) : (
          <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.bookList}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: BOTTOM_BAR_HEIGHT,
  },
  scrollView: {
    flex: 1,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  introContainer: {
    padding: 16,
    backgroundColor: "#FFF8E7",
    borderBottomWidth: 1,
    borderBottomColor: "#E5D7B4",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7B5C26",
    marginBottom: 16,
    textAlign: "center",
  },
  introText: {
    fontSize: 16,
    color: "#553D13",
    marginBottom: 10,
    lineHeight: 22,
    textAlign: "justify",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7B5C26",
    marginVertical: 16,
    marginLeft: 16,
  },
  bookList: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  bookItem: {
    width: screen.width / 2 - 16,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  bookCard: {
    backgroundColor: "#FFF8E7",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 200,
    justifyContent: "space-between",
  },
  bookImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 4,
  },
  defaultBookIcon: {
    width: "100%",
    height: 120,
    backgroundColor: "#F0E6D2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#553D13",
    textAlign: "center",
    marginTop: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  retryButton: {
    backgroundColor: "#7B5C26",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function BooksNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BooksList"
        component={BooksScreen}
        options={{
          headerShown: true,
          headerTitle: "Thư viện sách",
          headerTitleStyle: {
            fontFamily: "Roboto Condensed",
            fontSize: 16,
            color: "#7B5C26",
          },
        }}
      />
      <Stack.Screen
        name="BookPDFViewer"
        component={BookPDFViewer}
        options={{
          headerShown: true,
          headerBackTitle: "",
          headerBackTitleStyle: {
            color: "#7B5C26",
          },
          headerTitleStyle: {
            fontFamily: "Roboto Condensed",
            fontSize: 16,
            color: "#7B5C26",
          },
          headerBackImage: () => (
            <Ionicons name="chevron-back" size={24} color="#7B5C26" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
