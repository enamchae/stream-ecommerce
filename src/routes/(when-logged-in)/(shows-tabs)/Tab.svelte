<script lang="ts">
const {
    onClick,
    label,
    icon,
    accent,
    shadowAccent,
    selected,
} = $props<{
    onClick: () => void,
    label: string,
    icon: string,
    accent: string,
    shadowAccent: string,
    selected: boolean,
}>();
</script>


<nav-tab
    onclick={onClick}
    tabindex="0"
    style:--accent={selected ? accent : "#0000"}
    style:--shadow-accent={selected ? accent : "#0000"}
>
    <img src={icon} />
    <div>{label}</div>
</nav-tab>


<style lang="scss">
nav-tab {
    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 8rem;

    cursor: pointer;
    background: var(--accent);
    box-shadow: 0 0.25rem 2rem var(--shadow-accent);
    border-radius: 0.5rem;

    --accent: #0000;
    --shadow-accent: #0000;

    > img {
        width: 2rem;
        height: 2rem;
        margin-bottom: -0.25rem;
    }
}
</style>