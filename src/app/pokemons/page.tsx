"use client";

import api from "@/axios";
import PokemonCard from "@/components/pokemon/pokemon-card";
import { useEffect, useState } from "react";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  sprite: string;
  types: {
    id: number;
    name: string;
    image: string;
  }[];
}

export interface Type {
	id: number,
	name: string,
	image: string
}

export default function PokemonsPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<Type[]>([]);
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ name: string; typeId: number | null }>({ name: "", typeId: null });
  const [pageLimit, setPageLimit] = useState(50);

  const handleScroll = async () => {
	const bottomReached = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
	if (bottomReached) {
		let newPage = page + 1;
		setPage(newPage);						
	}
  }

  const getPokemonTypes = async () => {
	const res = await api.get("/types");
	setPokemonTypes(res.data);
  }

  const getPokemons = async (page: number, limit: number, query?: { name?: string; typeId?: number | null }) => {
	const res = await api.get("/pokemons", {params: {...query, limit: limit, page: page}});
	setPokemons(res.data);
  }

  const handleLimitChange = async (limit: number) => {
	setPageLimit(limit);
  }

  const handleTypeIdChange = async (typeId: number) => {
	setQueryParams({ ...queryParams, typeId });
  }

  const handleSearch = async (name: string) => {
	setQueryParams({ ...queryParams, name });
  }

  useEffect(() => {
    getPokemons(page, pageLimit, queryParams)
	getPokemonTypes()
  }, [page, pageLimit, queryParams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  return (
    <div className="flex flex-col justify-center items-center m-4 gap-4">
		<div className="flex gap-4 text-black">
			<input type="text" onChange={(e) => handleSearch(e.target.value)} placeholder="Nom" className="w-full p-2" />
			<select
				value={queryParams.typeId ?? ""}
				onChange={(e) => handleTypeIdChange(Number(e.target.value))}
			>
				<option onClick={() => console.log("clicked")} value="">Tous les types</option>
				{pokemonTypes.map(type => (
					<option key={type.id} value={type.id}>{type.name}</option>
				))}
			</select>
			<input type="number" value={pageLimit} onChange={(e) => handleLimitChange(Number(e.target.value))} placeholder="Limite" className="" />
		</div>
      <div className="grid grid-cols-6 gap-4 sm:grid-cols-6 lg:grid-cols-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
