import { useState, useEffect } from "react";
import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonId, setPokemonId] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
        setPokemonName(data.results.map((pokemon) => pokemon.name));
        setPokemonId(data.results.map((pokemon) => pokemon.url.split('/')[6]));
        console.log(data.results);
      })
  }, [])

  return (
    <main>
      <h1 className={styles.page_title}>Pokemon - First Generation</h1>
      <ol className={styles.pokemon_list}>
        {
          pokemon.map((pokemon, index) => {
            return (
              <li key={index}>
                <Link href={`/pokemon/${pokemonId[index]}`}>
                  <a>{pokemonName[index]}</a>
                </Link>
              </li>
            )
          })
        }
      </ol>
    </main>
  )
}