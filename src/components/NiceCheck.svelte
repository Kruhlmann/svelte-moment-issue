<script>
    export let checked = false;

    let check = checked;

</script>

<div class="nice-check">
    <div class="box" class:checked={check} on:click={() => check = !check}>
        <div class="when-checked">
            Yes
        </div>
        <div class="when-not-checked">
            No
        </div>
    </div>
    <input type="checkbox" class="hidden" bind:value={check}/>
</div>

<style lang="scss">
    .box {
        width: 200px;
        height: 24px;
        box-sizing: border-box;
        border: 1px solid #CCC;
        overflow: hidden;
        cursor: pointer;

        .when-checked, .when-not-checked {
            display: flex;
            position: relative;
            align-items: center;
            top: -24px;
            width: 200px;
            height: 24px;
            padding: 0 10px;
            transition: top 0.15s linear;
            margin-top: -1px;
            font-size: 13px;
            text-transform: capitalize;
        }

        .when-checked {
            background-color: #1e4054;

            i {
                width: 20px;
                height: 20px;
            }
        }

        .when-not-checked {
            background-color: #192830;
        }

        &.checked {
            .when-checked, .when-not-checked  {
                top: 0;
            }
        }
    }
</style>