import { Pokemon } from "@/app/pokemons/page";
import Image from "next/image";
import Link from "next/link";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <>
      <div className="bg-slate-600 shadow-md rounded-lg p-4">
	  <Link href={`/pokemons/${pokemon.id}`}>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={128}
          height={128}
          className="w-32 h-32 mx-auto"
        />
        <h3 className="text-xl font-semibold text-center">
          {pokemon.id} - {pokemon.name}
        </h3>
        <div className="flex justify-center">
          {pokemon.types.map((type) => (
            <Image
              key={type.id}
              src={type.image}
              alt={type.name}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          ))}
        </div>
		</Link>
      </div>

    </>
  );
}
