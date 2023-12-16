"use client";
import Image from 'next/image';
import { buscarVarios } from '../services/pokeapiService';
import { useEffect, useState } from 'react';
import { PokemonCard } from '../components/PokemonCard';
import { Pokemons } from '../@types/pokemons';

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [offset, setOffset] = useState(0);

  const buscarPokemons = async () => {
    const response = await buscarVarios(offset);
    setPokemons(response.results);
  };

  useEffect(() => {
    buscarPokemons();
  }, [offset]);

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokename={pokemon.name} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOffset(offset + 10)}
        >
          Next
        </button>
        {offset !== 0 && (
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOffset(Math.max(offset - 10, 0))}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
