<script>
  import Input from '@comp/input.svelte';
  import { addTodo } from '@lib/query/todo';
  import { toastFailed, toastSuccess } from '@lib/utils/toast';
  import { user } from '@lib/stores/user';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  export let getTodos, isLoading;

  let title = '';
  let desc = '';
  let deadline = new Date();
  let placeholder = 'What needs to be done?';
  let descPlaceholder = 'Add a description';
</script>

<div
  class="flex flex-col w-1/2 px-40 border-r border-neutral-300 h-screen justify-center"
>
  <h1 class="text-3xl font-bold truncate mb-4">
    Hallo, <br />
    {$user?.email ?? 'Unknown'}!
  </h1>
  <h2 class="text-xl font-semibold mb-2">Add a new todo today!</h2>
  <Input title="Title" {placeholder} bind:value={title} />
  <Input title="Description" placeholder={descPlaceholder} bind:value={desc} />
  <Input title="Deadline" isDatePicker bind:value={deadline} />

  <button
    class="bg-green-700 p-2 rounded-md text-neutral-100"
    on:click={async () => {
      await addTodo(title, desc, deadline, $user?.id);
      title = '';
      desc = '';
      deadline = new Date();
      await getTodos();
    }}
  >
    {#if isLoading}
      Loading...
    {:else}
      Add Todo
    {/if}
  </button>
  <button
    on:click={() => goto('/todo/logs')}
    class="mt-10 cursor-pointer border border-neutral-900 w-24 text-center p-2 rounded-md"
  >
    View logs
  </button>
</div>
