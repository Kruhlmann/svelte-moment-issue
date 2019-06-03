<script>
    import { side_nav_items, user_files, open_files } from "../stores.js";
    import { onMount } from "svelte";

    export let show_outline = false;
    export let items = [];

    let files_outline;
    let explore_outline;
    let favorites_outline;
    let outlines = [];
    let outline_wrapper;
    let new_file_wrapper;
    let new_file_input;
    let add_file_btn;

    onMount(() => {
        outlines = {
            files: files_outline,
            explore: explore_outline,
            favorites: favorites_outline,
        }
        set_active_item($side_nav_items[0]);

        new_file_input.onblur = () => new_file_wrapper.classList.add("hidden");
        new_file_input.onkeyup = event => {
        }

        document.onkeyup = event => {
            if (event.keyCode === 27) {
                new_file_wrapper.classList.add("hidden");
            } else if (event.keyCode === 13 && !new_file_wrapper.classList.contains("hidden")) {
                add_new_file(new_file_wrapper.value);
                new_file_wrapper.classList.add("hidden");
            }
        };
    });

    function add_new_file() {
        const new_file = {
            name: new_file_input.value.endsWith(".json") ? new_file_input.value : `${new_file_input.value}.json`,
            owner: "gasolinebased",
            description: "",
            favorite: false,
            active: true,
            content: `{
                "beginsound": 1,
                "usebeginsound": false,
                "isdynamicgroup": false,
                "flashanimstart": 5,
                "targetduration": 0,
                "animduration": 0.5,
                "useendsound": false,
                "size": 1,
                "buffname": "Fear Ward",
                "translateoffsety": 50,
                "fontoffsety": 0,
                "dynamicsorted": false,
                "timerfont": 1,
                "y": 486,
                "x": -232,
                "test": false,
                "icon_r": 1,
                "translateoffsetx": 50,
                "hundredth": false,
                "fontcolor_b": 1,
                "groupnumber": 0,
                "secondspecifiertext": "",
                "dynamicspacing": 5,
                "stacks": ">=0",
                "fontsize": 1.5,
                "texture": "Interface\\Icons\\Spell_Holy_Excorcism",
                "fontcolor_r": 1,
                "inraid": 0,
                "alpha": 1,
                "friendlytarget": false,
                "timerfontsize": 1,
                "raidgroupmember": false,
                "rgmname": "",
                "fontcolor_g": 1,
                "icon_g": 1,
                "inraidinstance": 0,
                "fadealpha": 0.99,
                "secsleftdur": 0,
                "inbattleground": 0,
                "hidestacks": false,
                "enemytarget": false,
                "usefontcolor": false,
                "inparty": 0,
                "used": true,
                "endsound": 1,
                "dynamicorientation": 1,
                "fontoffsetx": 0,
                "icon_b": 1,
                "alive": 0,
                "secsleft": false,
                "timer": false,
                "fontalpha": 1,
                "secondspecifier": false,
                "blendmode": 1,
                "incombat": 0,
                "mounted": 0,
                "cpstacks": ">=0",
                "minutes": false,
                "isdebuff": false,
                "inverse": false,
                "exactname": false,
                "dynamiccenter": false,
                "flashanim": false,
                "cooldown": false,
                "scalefactor": 0.8,
            }`,
        };

        user_files.update(files => {
            files.forEach(f => f.active = false);
            files.push(new_file);
            return files;
        });

        open_files.update(files => {
            files.push(new_file);
            return files;
        });
    }

    function set_active_item(item) {
        if (item.active) {
            outline_wrapper.classList.toggle("collapsed");
            return;
        }
        outline_wrapper.classList.remove("collapsed");
        side_nav_items.update(items => {
            items.forEach(i => i.active = false);
            items.find(i => i.name === item.name).active = true;
            return items;
        });
        Object.values(outlines).forEach(outline => outline.classList.add("hidden"));
        outlines[item.name].classList.remove("hidden");
    }

    function show_new_file_input() {
        new_file_wrapper.classList.remove("hidden");
        new_file_input.focus();
        new_file_input.value = "";
    }

    function favorite_file(event, file) {
        event.stopPropagation();
        const favorite_status = !file.favorite;
        user_files.update(files => {
            files.find(f => f === file).favorite = favorite_status;
            return files;
        });
    }

    function open_file(file) {
        if (file.open) {
            return;
        }
        if ($open_files.find(f => f === file)) {
            open_files.update(files => {
                const found_file = files.find(f => f === file);
                found_file.active = true;
                found_file.open = true;
                console.log(files)
                return files;
            });
            return;
        }
        open_files.update(files => {
            file.active = true;
            files.push(file);
            return files;
        })
    }
</script>

<div class="sidebar">
    <div class="small-nav">
        {#each $side_nav_items as item}
            <div class="item"
                class:active={item.active}
                on:click={() => set_active_item(item)}
            >
                <i
                    class:fas={item.solid}
                    class:fa={!item.solid}
                    class="fa-{item.icon}"
                ></i>
            </div>
        {/each}
    </div>
    <div class="outline" bind:this={outline_wrapper}>
        <div class="item" bind:this={files_outline}>
            <div class="header">
                <span class="title">My power auras</span>
                <div class="btn-grp">
                    <i class="fas fa-plus" on:click={show_new_file_input} bind:this={add_file_btn}></i>
                    <i class="fas fa-download"></i>
                </div>
            </div>
            <div class="content">
                {#each $user_files as file}
                    <div class="file" on:click={() => open_file(file)}>
                        {#if file.icon}
                            <img src="img/{file.icon.toLowerCase()}.jpg" alt="{file.icon}">
                        {:else}
                            <i class="fas fa-question"></i>
                        {/if}
                        <span class="filename">{file.name}</span>
                        <span
                            class="favorite"
                            class:active={file.favorite}
                            on:click={event => favorite_file(event, file)}
                        >
                            <i class="fas fa-star"></i>
                        </span>
                    </div>
                {/each}
                <div class="file hidden" bind:this={new_file_wrapper}>
                    <i class="fas fa-question"></i>
                    <input type="text" class="filename" bind:this={new_file_input}/>
                </div>
            </div>
        </div>
        <div class="item" bind:this={explore_outline}>
            <div class="header">
                <span class="title">Explore</span>
            </div>
        </div>
        <div class="item" bind:this={favorites_outline}>
            <div class="header">
                <span class="title">Favorites</span>
            </div>
            <div class="content">
                {#each $user_files.filter(f => f.favorite) as file}
                    <div class="file" on:click={() => open_file(file)}>
                        {#if file.icon}
                            <img src="img/{file.icon.toLowerCase()}.jpg" alt="{file.icon}">
                        {:else}
                            <i class="fas fa-question"></i>
                        {/if}
                        <span class="filename">{file.name}</span>
                        <span
                            class="favorite"
                            class:active={file.favorite}
                            on:click={event => favorite_file(event, file)}
                        >
                            <i class="fas fa-star"></i>
                        </span>
                    </div>
                {/each}
                <div class="file hidden" bind:this={new_file_wrapper}>
                    <i class="fas fa-question"></i>
                    <input type="text" class="filename" bind:this={new_file_input}/>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    $border-color: #003d57;


    .sidebar {
        height: 100%;
        display: flex;
        flex-direction: row;

        .small-nav {
            width: 40px;
            height: 100%;
            background-color: #142c3a;
            border-right: 1px solid $border-color;

            .item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height:40px;
                font-size: 22px;
                color: #AAA;
                cursor: pointer;
                box-sizing: border-box;

                &.active, &:hover {
                    color: white;
                }

                &.active {
                    color: white;
                    background-color: #1c3c57;
                }
            }
        }

        .outline {
            width: 350px;
            background-color: #192830;
            border-right: 1px solid $border-color;

            &.collapsed {
                width: 0px;
            }

            .item {
                display: flex;
                flex-direction: column;
                height: 100%;

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 35px;
                    padding: 0 15px;
                    color: #CCC;
                    text-transform: uppercase;

                    .title {
                        flex: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin: 0 5px;
                        font-size: 12px;
                    }

                    .btn-grp {
                        font-size: 13px;

                        * {
                            cursor: pointer;
                            margin: 0 5px;

                            &:hover {
                                color: white;
                            }
                        }
                    }
                }

                .content {
                    flex: 1;

                    .file {
                        display: flex;
                        align-items: center;
                        color: #CCC;
                        cursor: pointer;
                        padding: 0 10px;
                        font-size: 13px;
                        margin: 5px 0;

                        &:hover {
                            background-color: #142c3a;
                        }

                        img, i {
                            width: 16px;
                            height: 16px;
                        }

                        .filename {
                            flex: 1;
                            margin: 0 5px;
                            border: none;
                            background-color: #192830;
                        }

                        .favorite {
                            color: #45667c;

                            &:hover {
                                color: #ffc43a;
                            }

                            &.active {
                                color: #ffc43a;

                                &:hover {
                                    color: #45667c;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>