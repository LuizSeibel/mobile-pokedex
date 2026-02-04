import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

import { Link } from "expo-router";

import { TouchableOpacity } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorByType = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  steel: "#B7B7CE",
  dark: "#705746",
  fairy: "#D685AD",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // fetch pokemons
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=12",
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{
            pathname: "/details",
            params: { name: pokemon.name },
          }}
          asChild
        >
          <TouchableOpacity
            style={{
              // @ts-ignore
              backgroundColor: colorByType[pokemon.types[0].type.name] + 75,
              padding: 20,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 150, height: 150 }}
            />
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});
