const about = {
    hobbies: {
        music: {
            'en-US': { label: 'Music', desc: 'Play Guitar, Eletric Guitar and Bass in these genres (Rock, Punk, Metal, NuMetal, etc.)' },
            'pt-BR': { label: 'Música', desc: 'Toco Violão, Guitarra e Baixo nestes gêneros (Rock, Punk, Metal, NuMetal, etc.)' }
        },
        cars: {
            'en-US': { label: 'Cars', desc: 'I like to drive and modified cars' },
            'pt-BR': { label: 'Carros', desc: 'Gosto de dirigir e carros modificados' }
        },
        games: {
            'en-US': { label: 'Games', desc: 'I like to play games, especially RPG and FPS' },
            'pt-BR': { label: 'Jogos', desc: 'Gosto de jogar, especialmente RPG e FPS' }
        },
        gym: {
            'en-US': { label: 'Gym', desc: 'I like to go to the gym and walk' },
            'pt-BR': { label: 'Academia', desc: 'Gosto de ir para a academia e caminhar' }
        },
        movies: {
            'en-US': { label: 'Movies', desc: 'I like to watch movies and series (action, adventure, plot-twist, sci-fi, etc.)' },
            'pt-BR': { label: 'Filmes', desc: 'Gosto de assistir filmes e séries (ação, aventura, plot-twist, sci-fi, etc.)' }
        },
        books: {
            'en-US': { label: 'Books', desc: 'I like to read books (fantasy, sci-fi, adventure, etc.)' },
            'pt-BR': { label: 'Livros', desc: 'Gosto de ler livros (fantasia, sci-fi, aventura, etc.)' }
        },
        travel: {
            'en-US': { label: 'Travel', desc: 'I like to travel and know new places' },
            'pt-BR': { label: 'Viagens', desc: 'Gosto de viajar e conhecer novos lugares' }
        },
        technology: {
            'en-US': {label: 'Technology', desc: 'I like to learn and work with new technologies'},
            'pt-BR': {label: 'Tecnologia', desc: 'Gosto de aprender e trabalhar com novas tecnologias'}
        }
    }
}

export default function Hobbies({language}) {
    return (
        <div>
            <h1>Hobbies</h1>
            <span>
                {Object.keys(about.hobbies).map((key, index) => {
                    return (
                        <p key={index}>
                            <b>{about.hobbies[key][language].label}</b>: {about.hobbies[key][language].desc}
                        </p>
                    )
                })}
            </span>
        </div>
    )
}