import { PositionalAudio } from "@react-three/drei";

export function AmbientSound() {
    return (
        <PositionalAudio
            url = "/sounds/waves.mp3"
            distance={1000}
            loop
            autoplay
        />
    );
}

export function SeaGull() {
    return (
        <PositionalAudio
            url = "/sounds/seagull.mp3"
            distance = {10}
            loop
            autoplay
        />
    );
}