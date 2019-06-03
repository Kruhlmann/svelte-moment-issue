<script>

    let checked;

</script>

<div class="nice-check">
    <div class="box" class:checked={checked} on:click={() => checked = !checked}>
        <div class="when-checked">
            <div class="checkmark">
                <i class="fas fa-check"></i>
            </div>
        </div>
    </div>
    <input type="checkbox" class="hidden" bind:value={checked}/>
</div>

<style lang="scss">
    .box {
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        border: 1px solid #CCC;
        overflow: hidden;
        cursor: pointer;

        .when-checked, .when-not-checked {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 24px;
            position: relative;
            transition: top 0.15s linear;
        }

        .when-checked {
            top: -24px;
            background-color: #3f80c9;

            i {
                width: 20px;
                height: 20px;
            }
        }

        .when-not-checked {
            top: 0;
            background-color: #192830;
        }

        &.checked {
            .when-checked {
                top: 0px;
            }

            .when-not-checked {
                top: 24px;
            }
        }
    }
</style>