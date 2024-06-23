import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";

export default function App() {
	const [password, setPassword] = useState<string>("");
	const [length, setLength] = useState<number>(8);
	const [allowNumbers, setAllowNumbers] = useState<boolean>(true);
	const [allowSpecialCharacters, setAllowSpecialCharacters] = useState<boolean>(true);

	const generatePassword = useCallback(() => {
		let generatedPassword: string = "";

		let allowedCharacters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (allowNumbers) allowedCharacters += "0123456789";
		if (allowSpecialCharacters) allowedCharacters += "!@#$%^&*";

		for (let i = 0; i < length; i++) {
			generatedPassword += allowedCharacters[Math.ceil(Math.random() * allowedCharacters.length)];
		}
		setPassword(generatedPassword);
	}, [length, allowNumbers, allowSpecialCharacters]);

	useEffect(() => {
		generatePassword();
	}, []);

	return (
		<View style={styles.container}>
			<Text>{password}</Text>
			<Button
				title="generate"
				onPress={generatePassword}
			/>
			<StatusBar style="auto" />
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
});
