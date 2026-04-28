import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useAudio = (audioSrc) => {
    const isAudioPlaying = useSelector((state) => state.ui.isAudioPlaying);
    // Use lazy state initialization so the Audio object is created exactly once
    const [audio] = useState(() => new Audio(audioSrc));

    useEffect(() => {
        audio.loop = true;
        audio.volume = 0.3; // Unobtrusive background volume

        if (isAudioPlaying) {
            audio.play().catch((err) => {
                console.warn("Browser autoplay policy prevented audio playback:", err);
            });
        } else {
            audio.pause();
        }
    }, [isAudioPlaying, audio]);

    // Cleanup on unmount to prevent memory leaks in React Strict Mode
    useEffect(() => {
        return () => {
            audio.pause();
        };
    }, [audio]);

    return audio;
};