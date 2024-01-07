import { Text, View, Image, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

function Header() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/book.png")} resizeMode="contain" style={styles.img}/>
      <Text style={styles.headerText}>QUIZ</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 16,
    },
    headerText: {
        color: Colors.secondary500,
        fontSize: 36,
        fontWeight: 'bold'
    },
    img: {
        height: 100,
        width: '25%',
    }
});
