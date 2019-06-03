<script>
    export let sounds = [
        {name: "horse", ext: "ogg"},
    ]

    function play(sound) {
        if (!sound.hasOwnProperty("sound_obj")) {
            sound.sound_obj = new Audio(`audio/${sound.name}.${sound.ext}`);
            sound.sound_obj.volume = 0.1;
        }
        sound.sound_obj.play();
    }
</script>

<div class="audio-picker">
    <div class="styled-select">
        <select>
            <option class="special">No sound</option>
            {#each sounds as sound}
                <option value="{sound.name}" on:click={() => play(sound)}>sound.name</option>
            {/each}
        </select>
    </div>
</div>

<style lang="scss">
    option {
        color: #CCC;
    }

</style>
