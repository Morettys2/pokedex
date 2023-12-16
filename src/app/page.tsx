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
    <div className="bg-gradient-to-b from-blue-700 via-blue-300 to-white min-h-screen p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokemons.map((pokemon, index) => (
            <div key={pokemon.name} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-2xl font-bold mb-2">#{index + 1}</p>
              <PokemonCard pokename={pokemon.name} />
              {pokemon.types && (
                <p className="text-gray-600 mt-2">
                  Type: {pokemon.types.map((type) => type.type.name).join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
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
