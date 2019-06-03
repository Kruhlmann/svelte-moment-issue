<script>
	import { createEventDispatcher } from "svelte";
    import { icons } from "../consts.js";

    export let defaultico = "ability_ambush";
    export let open = false;

    const dispatch = createEventDispatcher();

    let chosen_icon;
    let hover_icon;
    let root_node;

    function chose_icon(icon) {
        chosen_icon = icon;
        open = false;
        dispatch("icon", {
            icon,
        });
    }

    document.onkeydown = (event) => {
        if (event.keyCode === 27) {
            open = false;
        }
    }
</script>

<div bind:this={root_node} class="views" class:open={open}>
    <div class="wrapper">
        <div class="iconlist-wrapper" class:hidden={!open}>
            <div class="iconlist">
                {#each icons as icon}
                    <div class="icon">
                        <img
                            src="img/{icon}.jpg"
                            alt="Icon preview {icon}"
                            on:click={() => chose_icon(icon)}
                            on:mouseenter={() => hover_icon = icon}
                            on:mouseleave={() => hover_icon = false}
                        >
                    </div>
                {/each}
            </div>
        </div>
        <div class="preview-wrapper">
            <div class="preview">
                <img
                    src="img/{hover_icon || chosen_icon || defaultico}.jpg"
                    alt="Icon preview {hover_icon || chosen_icon || defaultico}"
                    on:click={() => open = !open}
                >
            </div>
            <div class="name" on:click={() => open = true}>{hover_icon || chosen_icon || defaultico}</div>
        </div>
    </div>
</div>



<style lang="scss">
    .views {

        &.open {
            flex: 1;
        }

        &:not(.open) {
            .wrapper {
                width: 200px;
            }
        }

        .wrapper {
            display: flex;
            background-color: #192830;
            border: 1px solid #CCC;
            margin: 0 -1px;

            &:hover {
                background-color: #1e4054;
            }

            .iconlist-wrapper {
                flex: 1;
                padding: 10px;
                padding-bottom: 25px;

                .iconlist {
                    display: flex;

                    .icon {
                        cursor: pointer;
                        width: 32px;
                        height: 32px;

                        img {
                            width: 32px;
                            height: 32px;
                        }
                    }
                }

            }

            .preview-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 200px;

                .preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 200px;
                    box-sizing: border-box;
                    padding: 10px;
                    padding-bottom: 5px;
                    border-bottom: 0px;

                    img {
                        width: 100px;
                        height: 100px;
                        cursor: pointer;
                    }
                }

                .name {
                    width: 200px;
                    padding: 4px 10px;
                    padding-top: 0;
                    border-top: none;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 13px;
                    box-sizing: border-box;
                    text-align: center;
                    padding-bottom: 5px;
                    cursor: pointer;
                }
            }
        }
    }
</style>