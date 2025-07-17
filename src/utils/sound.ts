import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

/**
 * Add a sound by name and file path
 * @param name The alias for the sound
 * @param src The file path to the sound
 */
export function add(name: string, src: string) {
    sounds[name] = new Howl({ src: [src] });
}

/**
 * Play a sound by name
 * @param name The alias for the sound
 */
export function play(name: string) {
    const sound = sounds[name];
    if (sound) {
        sound.play();
    } else {
        console.warn(`Sound "${name}" not found!`);
    }
}
