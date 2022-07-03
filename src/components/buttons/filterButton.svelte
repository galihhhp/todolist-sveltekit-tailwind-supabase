<script>
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@rgossiaux/svelte-headlessui';

  export let selected, item, getLogs;
</script>

<Listbox value={selected} on:change class="w-full">
  <ListboxButton
    class="p-2 bg-neutral-200 w-full border border-neutral-900 rounded-md"
    >{selected.charAt(0).toUpperCase() + selected.slice(1)}</ListboxButton
  >

  <ListboxOptions
    class="z-50 absolute right-4 mt-2 bg-neutral-300 p-2 text-neutral-800 w-56 shadow-md rounded-md"
  >
    {#each item as item}
      <ListboxOption
        value={item}
        class="cursor-pointer hover:bg-green-700 hover:text-neutral-100 p-2"
        on:click={getLogs}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>
