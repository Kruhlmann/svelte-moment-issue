<script>
    export let ratio = 16 / 9;
    export let def_x = 0;
    export let def_y = 0;
    export let bg = "default_1920x1080.jpg"
    export let icon = "ability_ambush";

    let x = def_x;
    let y = def_y;
    let expanded = false;
    let tracker;
    let tracker_size = 16;
    let ui_img;

    function on_canvas_click(event) {
        if (!expanded) {
            expanded = true;
            return;
        }
        console.log("clicked");
        expanded = false;
    }

    function on_canvas_mousemove(event) {
        if (!expanded) {
            return;
        }
        const rect = ui_img.getBoundingClientRect();
        tracker.style.left = `${event.clientX - rect.left}px`;
        tracker.style.top = `${event.clientY - rect.top - rect.height}px`;
    }

</script>

<div class="position-input" class:expanded={expanded}>
    <div class="canvas" on:click={on_canvas_click} on:mousemove={on_canvas_mousemove}>
        <img src="img/{bg}" bind:this={ui_img} alt="WoW user interface">
        <div class="tracker" id="tracker" bind:this={tracker}>

        </div>
    </div>
</div>

<style lang="scss">
    .position-input {
        display: flex;
        flex-direction: column;
        background-color: #192830;
        border: 1px solid #ccc;
        resize: none;
        font-size: 13px;
        box-sizing: border-box;
        flex: 1;

        .canvas {
            width: 100%;
            flex: 1;
            cursor: none;

            img {
                width: 100%;
                opacity: 0.55;
            }

            .tracker {
                position: relative;
                background: #FF000077;
                width: 16px;
                height: 16px;
            }
        }

        &:not(.expanded) {
            max-width: 200px;

            .canvas {
                cursor: pointer;

                .tracker {
                    display: none;
                }
            }
        }
    }
</style>