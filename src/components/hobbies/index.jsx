import './style.css'

const about = {
    hobbies: {
        music: {
            'en-US': { label: 'Music', desc: 'Play Guitar, Eletric Guitar and Bass', icon: `<i class="fas fa-guitar"></i>` },
            'pt-BR': { label: 'Música', desc: 'Toco Violão, Guitarra e Baixo', icon: `<i class="fas fa-guitar"></i>` }
        },
        cars: {
            'en-US': { label: 'Cars', desc: 'I like to drive and modified cars', icon: `<i class="fas fa-car"></i>` },
            'pt-BR': { label: 'Carros', desc: 'Gosto de dirigir e carros modificados', icon: `<i class="fas fa-car"></i>` }
        },
        games: {
            'en-US': { label: 'Games', desc: 'I like to play games, especially RPG and FPS', icon: `<i class="fas fa-gamepad"></i>` },
            'pt-BR': { label: 'Jogos', desc: 'Gosto de jogar, especialmente RPG e FPS', icon: `<i class="fas fa-gamepad"></i>` }
        },
        gym: {
            'en-US': { label: 'Gym', desc: 'I like to go to the gym and walk', icon: `<i class="fas fa-dumbbell"></i>` },
            'pt-BR': { label: 'Academia', desc: 'Gosto de ir para a academia e caminhar', icon: `<i class="fas fa-dumbbell"></i>` }
        },
        movies: {
            'en-US': { label: 'Movies', desc: 'I like to watch movies and series.', icon: `<i class="fas fa-film"></i>` },
            'pt-BR': { label: 'Filmes', desc: 'Gosto de assistir filmes e séries ', icon: `<i class="fas fa-film"></i>` }
        }
    }
}

export default function Hobbies({language}) {
    return (
        <div className={'hobbies'}>
            <label>Hobbies</label>
            <content>
                {Object.keys(about.hobbies).map((key, index) => {
                    return (
                        <p key={index}>
                            <b>{about.hobbies[key].icon} {about.hobbies[key][language].label}</b>: {about.hobbies[key][language].desc}
                        </p>
                    )
                })}
            </content>
        </div>
    )
}