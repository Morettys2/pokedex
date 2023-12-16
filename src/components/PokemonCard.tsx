"use client";
import { useEffect, useState } from "react";
import { buscarNome } from "../services/pokeapiService";
import { Pokemon } from "../@types/pokemon";
import Image from "next/image";

interface PokemonCardProps {
    pokename: string;
}



export const PokemonCard: React.FC<PokemonCardProps> = ({ pokename }) => {
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [carregando, setCarregando] = useState(true)

    const buscarPokemon = async () => {
        const response = await buscarNome(pokename)
        setPokemon(response)
        setCarregando(false)
    }

    useEffect(() => {
        buscarPokemon()
    }, [])

    if (carregando === true) {
        return (
            <div>Carregando</div>
        )
    }

    return (
        <div>
            pokename: {pokemon?.name}
            {
                pokemon?.types.map((type) => {
                    return (
                        <div key={type.type.name}>
                            {
                                type.type.name
                            }
                        </div>
                    )
                })
            }
            <Image
                src={
                    pokemon?.sprites.versions["generation-v"]["black-white"].animated.front_default as string
                }
                width={100}
                height={100}
                alt="Picture of the author"
            />
        </div>
    )
}