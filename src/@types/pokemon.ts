interface Animated {
    front_default:string
}



interface Blackwhite {  
    animated:Animated
}



interface Generationv {
    'black-white':Blackwhite
}


interface Versions {
    'generation-v':Generationv
}

interface Sprites {
    versions:Versions
}

interface Type {
    name:string,
    url:string
}

interface Types {
    slot:number,
    type:Type
}

export interface Pokemon {
    name:string,
    types:Types[],
    sprites:Sprites
    

   
}