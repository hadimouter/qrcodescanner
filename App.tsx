import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera/legacy";
import { CameraView } from "expo-camera";
import * as Linking from "expo-linking";

export default function App() {
	const [hasPermission, setHasPermission] = useState(false);
	const [scannedLink, setScannedLink] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleScan = ({ data }) => {
		if (!scannedLink) {
			setScannedLink(data);
		}
	};

	const handleNavigate = () => {
		Linking.openURL(scannedLink);
	};

	const handleReset = () => {
		setScannedLink(null);
	};

	if (!hasPermission) {
		return <View />;
	}

	let scanContainer: {};
	if (scannedLink) {
		scanContainer = (
			<View style={styles.menu}>
				<Text style={styles.text}>Code scanned!</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={() => handleNavigate()} style={styles.button}>
						<Text style={styles.text}>Follow link</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleReset()} style={styles.button}>
						<Text style={styles.text}>Scan again</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Camera
				onBarCodeScanned={scannedLink ? undefined : handleScan}
				style={styles.scanner}
			/>
			{scanContainer}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scanner: {
		flex: 1,
	},
	text: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 18,
	},
	button: {
		backgroundColor: "#3b3485",
		padding: 20,
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 35,
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "75%",
	},
	menu: {
		display: "flex",
		alignItems: "center",
	},
});
