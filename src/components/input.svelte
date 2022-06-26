<script>
  export let value, title, placeholder;
</script>

<div class="flex flex-col gap-1 mb-2 w-full">
  <p class="text-lg">{title}</p>
  <input
    type="text"
    class="p-2 bg-neutral-400 text-neutral-900 placeholder:text-neutral-600 w-full"
    bind:value
    {placeholder}
  />
</div>
