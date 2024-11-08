# Durba-GroupB-hpan0072
This project is my individual task. It visualizes musical interactions using elements(dots, concentric circles, dash circles, stroke circles) respond dynamically to audio input. 
## How to Interact

1. **Play/Pause Button**: Use the "Play/Pause" button to start or stop the music. When the music plays, the visual elements respond to the audio, creating a rhythmic, animated display.
2. **Visual Effects**: The concentric circles exhibit a swirling color shift, with colors gradually moving outward to create a pulsing effect. Dots Layers and stroke circles expand and contract to follow the beat of the music.
3. **Adaptive Layout**: The visuals adjust to screen resizing, ensuring a consistent experience across different window sizes.



## Animation Effect Details

The interactive animations are controlled by FFT analysis, allowing real-time transformations that sync with the audio’s rhythm and frequency.


- **Swirling Color Shift**: Concentric circles shift their colors outward, creating a continuous swirling effect based on FFT analysis of lower frequencies. The color shift occurs only while the music plays, and the `shiftSpeed` is controlled by the amplitude in the "lowMid" frequency band. So that the color will change follow the musical rhythm.
- **Expansion and Contraction of Dots**: dots layers and stroke circles are expand and contract based on mid-range frequencies, which are mapped to scaling factors. This results in rhythmic, pulse-like movements that synchronize with the audio’s beat.


