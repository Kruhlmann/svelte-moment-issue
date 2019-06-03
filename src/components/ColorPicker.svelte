<script>
    export let color ="#000000";

    let picker;

    function hex_to_rgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
            : null;
    }

    $: text_color = () => {
        const rgb_color = hex_to_rgb(color.replace("#", ""));
        return (rgb_color.r * 0.299 + rgb_color.g * 0.587 + rgb_color.b * 0.114) > 186
            ? "#222"
            : "#CCC";
    }
</script>

<div class="color-picker" on:click={() => picker.click()}>
    <div class="pseudo-picker" style="background-color: {color}; color: {text_color};">{color}</div>
    <input type="color" bind:value={color} bind:this={picker}/>
</div>

<style lang="scss">
    .color-picker {
        cursor: pointer;

        .pseudo-picker {
            width: 200px;
            border: 1px solid;
            box-sizing: border-box;
            padding: 0 10px;
            font-size: 13px;
            height: 24px;
            padding-top: 2px;
        }

        input {
            display: none;
        }
    }
</style>