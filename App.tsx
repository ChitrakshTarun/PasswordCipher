import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import Checkbox from "expo-checkbox";
import * as Clipboard from "expo-clipboard";

export default function App() {
	const [password, setPassword] = useState<string>("");
	const [length, setLength] = useState(8);
	const [allowNumbers, setAllowNumbers] = useState<boolean>(true);
	const [allowSpecialCharacters, setAllowSpecialCharacters] = useState<boolean>(true);

	const generatePassword = useCallback(() => {
		let generatedPassword: string = "";

		let allowedCharacters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (allowNumbers) allowedCharacters += "0123456789";
		if (allowSpecialCharacters) allowedCharacters += "!@#$%^&*";

		for (let i = 0; i < length; i++) {
			generatedPassword += allowedCharacters.charAt(Math.floor(Math.random() * allowedCharacters.length + 1));
		}

		setPassword(generatedPassword);
	}, [length, allowNumbers, allowSpecialCharacters]);

	const copyPassword = async () => {
		await Clipboard.setStringAsync(password);
		Alert.alert("Password Copied!");
	};

	useEffect(() => {
		generatePassword();
	}, [length, allowNumbers, allowSpecialCharacters]);

	return (
		<View style={styles.container}>
			<View style={styles.passwordContainer}>
				<Text style={styles.headingText}>Your password is: </Text>
				<Text style={styles.passwordText}>{password}</Text>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={generatePassword}
				>
					<Text style={styles.headingText}>Generate Password</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={copyPassword}
				>
					<Text style={styles.headingText}>Copy Password</Text>
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
			<View style={styles.controlsMenuContainer}>
				<Text style={styles.headingText}>Controls</Text>
				<Text style={styles.controlsText}>Password Length: {length}</Text>
				<Slider
					value={length}
					minimumValue={3}
					maximumValue={24}
					step={1}
					onValueChange={(value) => setLength(value[0])}
					trackClickable={true}
				/>
				<View style={styles.controlsContainer}>
					<Checkbox
						style={styles.checkbox}
						value={allowNumbers}
						onValueChange={setAllowNumbers}
						color={allowNumbers ? "#55a0e0" : undefined}
					/>
					<Text style={styles.controlsText}>Allow Numbers (0 1 2 3 4 5 6 7 8 9)</Text>
				</View>
				<View style={styles.controlsContainer}>
					<Checkbox
						style={styles.checkbox}
						value={allowSpecialCharacters}
						onValueChange={setAllowSpecialCharacters}
						color={allowSpecialCharacters ? "#55a0e0" : undefined}
					/>
					<Text style={styles.controlsText}>Allow Special Characters (! @ # $ % ^ & *)</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	headingText: {
		fontSize: 24,
		paddingBottom: 8,
	},
	passwordText: {
		fontSize: 36,
	},
	passwordContainer: {
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
	},
	controlsMenuContainer: {
		flex: 1,
		paddingVertical: 36,
		width: "90%",
		marginLeft: 10,
		marginRight: 10,
		alignItems: "stretch",
		justifyContent: "center",
	},
	controlsContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	controlsText: {
		fontSize: 16,
	},
	checkbox: {
		margin: 8,
	},
	buttonContainer: {
		backgroundColor: "#55a0e0",
		padding: 12,
		minWidth: "50%",
		marginTop: 48,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
});
