import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function About() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>About Me</Text>
			<Text style={styles.hobby}>
				Drawing: Sketching helps me relieve stress and relax.
			</Text>
			<Text style={styles.hobby}>
			    Painting: I am able to express myself and be creative.	
			</Text>
			<Text style={styles.hobby}>
				Reading: I love reading fictional books.
            </Text>
            <Text style={styles.hobby}>
                Baking: I love sweets so I love baking cakes and cookies.
			</Text>

			<Pressable style={styles.button} onPress={() => router.back()}>
				<Text style={styles.buttonText}>Go Back</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
		backgroundColor: "#eaf6ff",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 12,
		color: "#1f4e79",
	},
	text: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
		color: "#010305",
	},
	hobby: {
		fontSize: 15,
		textAlign: "center",
		marginBottom: 12,
		color: "#010305",
	},
	button: {
		backgroundColor: "#78b7e8",
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 8,
		marginTop: 4,
	},
});
