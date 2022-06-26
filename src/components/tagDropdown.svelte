<script>
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@rgossiaux/svelte-headlessui';

  export let selectedTag;
  export let tags;
</script>

<Listbox value={selectedTag} on:change class="w-full">
  <ListboxButton class="p-2 bg-neutral-900 w-full">{selectedTag}</ListboxButton>
  <ListboxOptions
    class="z-50 absolute bg-neutral-300 p-2 text-neutral-800 w-[490px]"
  >
    {#each tags as tag}
      <ListboxOption value={tag} class="cursor-pointer hover:bg-green-700 p-2">
        {tag}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>
