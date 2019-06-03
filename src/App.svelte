<script>
    import Sidebar from "./components/Sidebar.svelte";
    import Editor from "./components/Editor.svelte";
</script>

<div class="main">
    <Sidebar/>
    <Editor/>
</div>

<style lang="scss">
    :global(body, html, .main) {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    }

    :global(.hidden) {
        display: none !important;
    }

    :global(.styled-select) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 200px;
        height: 24px;
        overflow: hidden;
        background-color: #192830;
        border: 1px solid #ccc;
        cursor: pointer;
        box-sizing: border-box;

        select {
            background: transparent;
            width: 200px;
            padding: 0 10px;
            font-size: 13px;
            line-height: 1;
            border: 0;
            border-radius: 0;
            height: 24px;
            -webkit-appearance: none;
            margin-top: -2px;
            cursor: pointer;
            text-overflow: ellipsis;

            &:disabled {
                cursor: text;
            }

            &:-moz-focusring {
                color: transparent;
                text-shadow: 0 0 0 #CCC;
            }

            &:not(:disabled):hover {
                background-color: #1e4054;
            }

            option {
                padding: 0;
                text-overflow: ellipsis;

                &:not(:checked) {
                    color: #CCC;
                }
            }
        }

        i {
        }
    }

    :global(.ace-cobalt) {
        background: #163343;

        &.ace_multiselect .ace_selection.ace_start {
            box-shadow: 0 0 3px 0px #002240;
        }

        .ace_gutter {
            background: #183849;
        }

        .ace_print-margin {
            width: 1px;
            background: #555555
        }

        .ace_marker-layer .ace_selection {
            background: #00529f;
        }

        .ace_cursor {
            color: #FFFFFF
        }

        .ace_active-line, .ace_gutter-active-line {
            background: rgba(0, 0, 0, 0.15) !important;
        }
    }

    .main {
        display: flex;
    }
</style>