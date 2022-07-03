<script>
  import { goto } from '$app/navigation';
</script>

<div class="flex justify-center items-center h-screen">
  <div
    class="border border-neutral-900 p-4 rounded-md w-56 cursor-pointer"
    on:click={() => goto('/todo')}
  >
    Personal
  </div>
</div>
