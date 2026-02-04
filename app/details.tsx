import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

export default function Details() {
  const params = useLocalSearchParams();

  const [pokemon, setPokemon] = useState<PokemonDetails>();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonByName(params.name as string);
  }, []);

  async function fetchPokemonByName(name: string) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}/`,
      );
      const data = await response.json();

      const formattedData = {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        height: data.height,
        weight: data.weight,
        types: data.types,
      };

      setPokemon(formattedData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          contentContainerStyle={{
            gap: 16,
            padding: 16,
            alignItems: "center",
          }}
          style={styles.container}
        >
          <Image
            source={{ uri: pokemon?.image }}
            style={{ width: 200, height: 200 }}
          />

          <Text style={styles.name}>#{pokemon?.id}</Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            {pokemon?.types.map((item) => (
              <Text key={item.type.name} style={styles.type}>
                {item.type.name.toLocaleUpperCase()}
              </Text>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#f5f3f3",
              padding: 16,
              borderRadius: 16,
            }}
          >
            <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
              <Text style={styles.characteristic}>Weight</Text>
              <Text style={styles.characteristicLabel}>
                {pokemon?.weight} kg
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
              <Text style={styles.characteristic}>Height</Text>
              <Text style={styles.characteristicLabel}>
                {pokemon?.height} m
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  name: {
    fontSize: 18,
    color: "gray",
  },
  type: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
  },
  characteristic: {
    fontSize: 12,
    color: "gray",
  },
  characteristicLabel: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
});
