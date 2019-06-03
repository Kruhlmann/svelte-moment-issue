<script>
    import IconPicker from "./IconPicker.svelte"
    import NiceCheck from "./NiceCheck.svelte"
    import { onMount } from "svelte";
    import { open_files } from "../stores.js";
    import ace from "ace-builds";
    ace.config.set("basePath", "lib/ace/");

    let icon_intermediary;

    $: shown_file = $open_files.find(f => f.active);

    function close_file(file) {
        open_files.update(files => files.filter(f => f !== file));
    }

    function set_icon(icon) {
        icon_intermediary.value = icon;
        icon_intermediary.dispatchEvent(new Event("input"));
    }

    function edit_file(file) {
        open_files.update(files => {
            const found_file = files.find(f => f.name === file.name);
            if (!found_file.editor_session) {
                found_file.editor_session = ace.createEditSession(JSON.stringify(file, null, "\t"), "ace/mode/lua");
            }
            found_file.editor_session.setMode("ace/mode/json");
            editor.setSession(found_file.editor_session);
            files.forEach(f => f.active = false);
            found_file.active = true;
            return files;
        });
    }

    onMount(() => {
        editor = ace.edit("editor");
        editor.setTheme("ace/theme/cobalt");
        editor.session.setMode("ace/mode/json");
    });
</script>

<div class="editor-wrapper">
    <div class="header" class:hidden={$open_files.length < 1}>
        <div class="tabs">
            {#each $open_files as file}
                <div class="tab" class:active={file.active} on:click={() => edit_file(file)}>
                    {#if file.icon}
                        <img src="img/{file.icon.toLowerCase()}.jpg" alt="{file.icon}">
                    {:else}
                        <i class="fas fa-question"></i>
                    {/if}
                    <span class="filename">{file.name}.json</span>
                    <span class="close" on:click={() => close_file(file)}>
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            {/each}
        </div>
        <div class="actions">
            <div class="action">
                <i class="fas fa-download"></i>
            </div>
            <div class="action">
                <i class="fas fa-trash"></i>
            </div>
        </div>
    </div>
    <div class="editors" class:hidden={$open_files.length < 1}>
        <div class="editor" id="editor"></div>
        {#if shown_file}
            <div class="gui-editor">
                <div class="gui-header">
                    <span class="title">{shown_file.name}</span>
                    <div class="icon">
                        {#if shown_file.icon}
                            <img src="img/{shown_file.icon.toLowerCase()}.jpg" alt="{shown_file.icon}">
                        {:else}
                            <i class="fas fa-question"></i>
                        {/if}
                    </div>
                </div>
                <div class="gui-editor-content">
                    <div class="entry-divider">
                        <span>Meta</span>
                    </div>
                    <div class="input-entry">
                        <span class="label">ID</span>
                        <div class="styled-select">
                            <select disabled>
                                <option selected>{shown_file.id}</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-entry">
                        <span class="label">Name</span>
                        <input type="text" bind:value="{shown_file.name}"/>
                    </div>
                    <div class="input-entry">
                        <span class="label">Author</span>
                        <div class="styled-select">
                            <select disabled>
                                <option selected>{shown_file.owner}</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-entry">
                        <span class="label">Icon</span>
                        <IconPicker
                            defaultico="{shown_file.icon.toLowerCase()}"
                            on:icon={event => set_icon(event.detail.icon)}
                        />
                        <input type="text" class="hidden" bind:this={icon_intermediary} bind:value={shown_file.icon}>
                    </div>
                    <div class="input-entry">
                        <span class="label">Description</span>
                        <textarea placeholder="No description.">{shown_file.description || ""}</textarea>
                    </div>
                    <div class="input-entry">
                        <span class="label">Favorite</span>
                        <NiceCheck/>
                    </div>
                    <div class="entry-divider">
                        <span>Aura</span>
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <div class="backdrop" class:hidden={$open_files.length > 0}>
        <i class="fas fa-pen"></i>
        <span>No editors open</span>
    </div>
</div>

<style lang="scss">
    .editor-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;

        .header {
            display: flex;
            height: 25px;
            justify-content: space-between;
            align-items: center;
            background-color: #142c3a;
            z-index: 1;

            .actions {
                display: flex;
                align-items: center;
                flex: 1;
                border-bottom: 1px solid #131f3d;
                height: 100%;
                justify-content: flex-end;
                padding: 0 10px;
                box-sizing: border-box;

                .action {
                    margin: 0 5px;
                    color: #a3a9a6;
                    font-size: 13px;
                    cursor: pointer;

                    &:hover {
                        color: white;
                    }
                }
            }

            .tabs {
                display: flex;

                .tab {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    min-width: 125px;
                    font-size: 12px;
                    color: #a3a9a6;
                    box-sizing: border-box;
                    border: 1px solid #141a29;
                    border-right: none;
                    border-top: none;
                    cursor: pointer;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    &:first-child {
                        border-left: none;
                    }

                    &:last-child {
                        border-right: 1px solid #131f3d;
                    }

                    &.active {
                        color: #fff;
                        background-color: #183849;
                        border-bottom: 1px solid #ffc43a;
                    }

                    img {
                        width: 10px;
                        height: 10px;
                        margin-left: 5px;
                    }

                    i {
                        font-size: 10px;
                        margin-left: 5px;
                    }

                    .filename {
                        flex: 1;
                        padding: 0 5px;
                    }

                    .close {
                        opacity: 0;
                        height: 23px;
                        width: 20px;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &:hover {
                            color: white;
                        }
                    }

                    &:hover {
                        .close {
                            opacity: 1;
                        }
                    }
                }
            }
        }

        .backdrop {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;
            color: #55738a;
            background-color: #142c3a;

            i {
                font-size: 96px;
                margin-bottom: 20px;
            }

            span {
                font-size: 22px;
            }
        }

        .editors {
            display: flex;
            height: 100%;
            margin-top: -25px;
            box-sizing: border-box;
            padding-top: 25px;

            .editor, .gui-editor {
                width: 50%;
            }

            .gui-editor {
                color: #CCC;
                font-size: 16px;
                background-color: #163343;
                border-left: 1px solid #003d57;
                box-sizing: border-box;
                padding: 25px;
                overflow-y: auto;

                .gui-header {
                    display: flex;
                    border-bottom: 1px solid #CCC;
                    align-items: center;
                    padding-bottom: 8px;

                    .title {
                        font-size: 26px;
                        flex: 1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-right: 5px;
                    }

                    .icon {
                        display: flex;
                        align-items: center;
                        font-size: 28px;
                        border-radius: 24px;
                        width: 48px;
                        height: 48px;

                        & > * {
                            position: relative;
                            border-radius: 24px;
                            width: 48px;
                            height: 48px;
                        }
                    }
                }

                .gui-editor-content {
                    margin-top: 5px;
                    display: flex;
                    flex-direction: column;

                    .entry-divider{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        span {
                            font-size: 15px;
                            font-style: italic;
                        }
                    }

                    .input-entry {
                        display: flex;
                        align-items: center;
                        margin-bottom: 5px;
                        justify-content: space-between;

                        .label {
                            min-width: 100px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        input[type="text"] {
                            width: 200px;
                            height: 24px;
                            overflow: hidden;
                            background-color: #192830;
                            border: 1px solid #ccc;
                            box-sizing: border-box;
                            font-size: 13px;
                            padding: 0 14px;
                            padding-bottom: 2px;

                            &:hover, &:focus {
                                background-color: #1e4054;
                            }
                        }

                        textarea {
                            background-color: #192830;
                            border: 1px solid #ccc;
                            resize: none;
                            width: 200px;
                            padding: 0 10px;
                            font-size: 13px;
                            box-sizing: border-box;
                            height: 136px;

                            &:hover, &:focus {
                                background-color: #1e4054;
                            }
                        }
                    }
                }
            }
        }
    }
</style>