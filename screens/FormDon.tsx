import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Slider from "@react-native-community/slider";

export default function FormDon() {
  const [amount, setAmount] = useState(10);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donationCount, setDonationCount] = useState(0);
  const [showEthicalWarning, setShowEthicalWarning] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  const predefinedAmounts = [5, 10, 20, 50, 100];

  useEffect(() => {
    setShowEthicalWarning(amount > 100);
  }, [amount]);

  const pulseHeart = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
    setDonationCount((prev) => prev + 1);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setShowConfirmation(false);
        });
      }, 2000);
    });
  };

  useEffect(() => {
    if (donationCount >= 3) {
      setShowHeart(true);
      pulseHeart();
    }
  }, [donationCount]);

  const getImpactText = () => {
    const meals = amount / 2;
    return `${amount}€ = ${meals} repas`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faire un don</Text>

      <View style={styles.amountButtons}>
        {predefinedAmounts.map((val) => (
          <TouchableOpacity
            key={val}
            style={[
              styles.amountButton,
              amount === val && styles.amountButtonSelected,
            ]}
            onPress={() => setAmount(val)}
          >
            <Text
              style={[
                styles.amountText,
                amount === val && styles.amountTextSelected,
              ]}
            >
              {val}€
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={200}
        step={5}
        value={amount}
        onValueChange={setAmount}
      />

      {showEthicalWarning && <Text style={styles.warningText}>Warning !</Text>}

      <Text style={styles.impactText}>{getImpactText()}</Text>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          showEthicalWarning && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirm}
        disabled={showEthicalWarning}
      >
        <Text style={styles.confirmButtonText}>
          {showEthicalWarning ? "Blocked" : "Confirmer"}
        </Text>
      </TouchableOpacity>

      {showConfirmation && (
        <Animated.View style={[styles.confirmationBox, { opacity: fadeAnim }]}>
          <Text style={styles.confirmationText}>Merci pour votre don ! 🙏</Text>
        </Animated.View>
      )}

      {showHeart && (
        <Animated.Text
          style={[styles.heart, { transform: [{ scale: heartScale }] }]}
        >
          ❤
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
  },
  amountButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  amountButton: {
    backgroundColor: "gray",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  amountButtonSelected: {
    backgroundColor: "blue",
  },
  amountText: {
    fontSize: 16,
    color: "black",
  },
  amountTextSelected: {
    color: "white",
    fontWeight: "bold",
  },
  slider: {
    width: 250,
    marginTop: 20,
  },
  impactText: {
    fontSize: 18,
    marginTop: 15,
  },
  confirmButton: {
    backgroundColor: "green",
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
  },
  confirmationBox: {
    marginTop: 40,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
  },
  confirmationText: {
    color: "white",
    fontSize: 16,
  },
  warningText: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  heart: {
    fontSize: 40,
    marginTop: 30,
  },
});
