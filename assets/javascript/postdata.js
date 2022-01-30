const apiMusicData = 'http://localhost:3000/music';

export const SONGS_PACK = () => fetch(apiMusicData) 
                                    .then(response => response.json());