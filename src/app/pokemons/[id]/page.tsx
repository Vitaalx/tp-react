"use client";

import { useEffect, useState } from "react";
import { Pokemon } from "../page";
import Image from "next/image";
import { useParams } from "next/navigation";
import api from "@/axios";
import Link from "next/link";

interface PokemonWithDetails {
	name: Pokemon["name"],
	image: Pokemon["image"],
	stats: {
		HP: number,
		speed: number,
		attack: number,
		defense: number,
		specialAttack: number,
		specialDefense: number,
		special_attack: number,
		special_defense: number
	},
	evolutions: [
		{
			name: string,
			pokedexId: number
		}
	]
}

interface Props {
	pokemonId: number
}


export default function PokemonPage() {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState<PokemonWithDetails | null>(null);

	const getPokemon = async (id: number) => {
		const res = await api.get(`/pokemons/${id}`)
		setPokemon(res.data);
	}

	useEffect(() => {
		getPokemon(Number(id));
	  }, [id]);

	  if (pokemon == null) {
		return (
			<div>
				Pokémon inexistant.
			</div>
		)
	  }

	  return (
		<>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex flex-col items-center">
					<h1>{pokemon.name}</h1>
				<Image
					src={pokemon.image}
					alt={pokemon.name}
					width={128}
					height={128}
				/>
				</div>
				<div>
					<h2>Stats</h2>
					<ul>
						<li>HP: {pokemon.stats.HP}</li>
						<li>Speed: {pokemon.stats.speed}</li>
						<li>Attack: {pokemon.stats.attack}</li>
						<li>Defense: {pokemon.stats.defense}</li>
						<li>Special Attack: {pokemon.stats.specialAttack}</li>
						<li>Special Defense: {pokemon.stats.specialDefense}</li>
					</ul>
				</div>
				<div>
					<h2>Evolutions</h2>
					<ul>
						{pokemon.evolutions.map((evolution) => (
							<li key={evolution.pokedexId}>{evolution.name}</li>
						))}
					</ul>
				</div>
				<Link href="/pokemons">Retour</Link>
			</div>
		</>
	  );
}