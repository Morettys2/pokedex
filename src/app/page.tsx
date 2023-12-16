'use client'
import Image from 'next/image';
import { buscarVarios } from '../services/pokeapiService';
import { use, useEffect, useState } from 'react';
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
    <div className="bg-blue-100 min-h-screen p-8">
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokemons.map((pokemon) => (
            <div key={pokemon.name} className="bg-white p-4 rounded-lg mb-4">
              <PokemonCard pokename={pokemon.name} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
            onClick={() => setOffset(offset + 10)}
          >
            Next
          </button>
          {offset !== 0 && (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
              onClick={() => setOffset(Math.max(offset - 10, 0))}
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}