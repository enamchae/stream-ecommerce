<script lang="ts">
let {
    initialText,
    onInput,
    placeholder,
    isTitle = false,
}: {
    initialText: string,
    onInput: (value: string) => void,
    placeholder: string,
    isTitle?: boolean,
} = $props();

let text = $state(initialText);

let editing = $state(false);
let lastText = $state(initialText);

$effect(() => {
    if (entry !== null && entry !== document.activeElement) return;

    text = initialText;
});

$effect(() => {
    if (editing) return;
    lastText = text;
});

let entry = $state<HTMLUnknownElement | null>(null);

const updateText = () => {
    if (entry === null) return;

    text = entry.textContent ?? "";
    onInput(text);
};
</script>


<rich-text-entry-container>
    {#if text.length === 0}
        <rich-text-placeholder
            class:heading={isTitle}
            class:heading-1={isTitle}
        >{placeholder}</rich-text-placeholder>
    {/if}
    <rich-text-entry
        contenteditable
        oninput={() => updateText()}
        onfocus={() => editing = true}
        onblur={() => editing = false}
        bind:this={entry}
        class:heading={isTitle}
        class:heading-1={isTitle}
    >{lastText}</rich-text-entry>
</rich-text-entry-container>


<style lang="scss">
rich-text-entry-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

rich-text-entry {
    display: block;
    word-wrap: break-word;
    min-height: 1em;
    outline-offset: 0.5rem;
}

rich-text-placeholder {
    position: absolute;
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
}
</style>