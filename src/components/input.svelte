<script>
  import Flatpickr from 'svelte-flatpickr';
  import 'flatpickr/dist/flatpickr.css';

  export let value, title, placeholder, isDatePicker;

  const options = {
    // element: '#my-picker',
    enableTime: false,
    // mode: 'range',
    // minDate: new Date(),
    // maxDate: new Date(),
  };
</script>

<div class="flex flex-col gap-1 mb-2 w-full">
  <p class="text-lg">{title}</p>

  {#if isDatePicker}
    <Flatpickr
      {options}
      bind:value
      name="date"
      class="w-full bg-neutral-200 border border-neutral-900 rounded-md p-2 cursor-pointer"
    />
  {:else}
    <input
      type="text"
      class="p-2 rounded-md bg-neutral-200 text-neutral-900 border border-neutral-900 placeholder:text-neutral-600 w-full"
      bind:value
      {placeholder}
    />
  {/if}
</div>
