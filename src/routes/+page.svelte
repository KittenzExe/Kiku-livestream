<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { fade } from 'svelte/transition';

    function truncateString(str: string, maxLength: number): string {
      return str.length <= maxLength ? str : str.slice(0, maxLength) + "...";
    }

    let ws: WebSocket | undefined;
    let id;
    let username;
    let track: string | undefined;
    let artist: string | undefined;
    let album: string | undefined;
    let currentPosition: number = 0;
    let duration: number = 0;
    let albumCoverUrl: string | undefined;
    let intervalId: number | NodeJS.Timeout | undefined;
    let spotify_status = "Not listening on Spotify";

    onMount(() => {
        ws = new WebSocket('wss://kiku.kittenzexe.com/v1/434904627906084868');

        ws.onmessage = (event) => {
            const responseData = JSON.parse(event.data);
            spotify_status = responseData.spotify_status;
            if (spotify_status !== "Not listening on Spotify") {
                id = responseData.id;
                username = responseData.username;
                track = truncateString(responseData.spotify_status.track, 35);
                artist = truncateString(responseData.spotify_status.artist, 35);
                album = responseData.spotify_status.album;
                duration = responseData.spotify_status.duration;
                currentPosition = responseData.spotify_status.current_position;
                albumCoverUrl = responseData.spotify_status.album_cover_url;
                console.log(id, username, track, artist, album, duration, currentPosition, albumCoverUrl);
            }
        };

        onDestroy(() => {
            if (ws) {
                ws.close();
            }
        });
    });
</script>

<div class="absolute top-1 right-1 flex m-3 bg-brand-dark-400 w-[550px] p-5 rounded-2xl">
    {#if spotify_status == "Not listening on Spotify"}
        <p class="text-md text-brand-light opacity-60" style="font-family: EffraRegular;">Not listening on Spotify</p>
    {:else}
        <div class="flex items-center">
            <div>
                <img src="{albumCoverUrl}" alt="" class="h-auto w-[100px] mr-1 rounded-md">
            </div>
            <div class="flex flex-col ml-2 w-[400px]">
                <div class="text-2xl text-brand-light flex items-center leading-3 w-92" style="font-family: EffraRegular;">
                    <span class="leading-6 w-92">
                        Listening to: {track}
                        <br>
                        By: {artist}
                    </span>
                </div>
                <div class="progress-container w-full">
                    <span class="mr-1 text-xl text-brand-light" style="font-family: EffraBold;">{Math.floor(currentPosition / 60)}:{(currentPosition % 60).toFixed(0).padStart(2, '0')}</span>
                    <div class="progress-bar">
                        <div class="progress" style="width: {currentPosition / duration * 100}%"></div>
                    </div>
                    <span class="ml-1 text-xl text-brand-light" style="font-family: EffraBold;">{Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}</span>
                </div>
                <p class="text-brand-light opacity-50">Powered by Kiku</p>
            </div>
        </div>
    {/if}
</div>

<style>
    @font-face {
        font-family: 'EffraBold';
        src: url('/font/Effra_Std_Bd.ttf') format('truetype'),
            url('/font/Effra_Std_Bd.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'EffraRegular';
        src: url('/font/Effra_Std_Rg.ttf') format('truetype'),
            url('/font/Effra_Std_Rg.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    .progress-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .progress-bar {
        background-color: #f4f4f4;
        width: 100%;
        height: 15px;
        border-radius: 10px;
        overflow: hidden;
    }
    .progress {
        background-color: #7d77d7;
        height: 100%;
        transition: width 0.1s ease-in-out;
    }
</style>