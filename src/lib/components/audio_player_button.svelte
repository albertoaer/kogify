<script lang="ts" context="module">
  let activeAudio: HTMLAudioElement | null = null;
</script>

<script lang="ts">
  import { Button } from ".";

  export let src: string;
  export let disabledText: string;
  export let enabledText: string;
  
  let audio!: HTMLAudioElement;
  let playing: boolean = false;

  function play() {
    activeAudio?.pause();
    activeAudio = audio;
    audio.currentTime = 0;
    audio.play();
  }

  function pause() {
    activeAudio = null;
    audio.pause();
  }
</script>


<Button on:click={_ => audio.paused ? play() : pause()} alt={playing}>
  {playing ? enabledText : disabledText}
  <audio {src} bind:this={audio} on:playing={_ => playing = true} on:pause={_ => playing = false} />
</Button>