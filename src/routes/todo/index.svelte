<script>
  import supabase from '@lib/db';
  import OptionsMenu from '@comp/optionsMenu.svelte';
  import Todos from '@pages/todos.svelte';
  import Input from '@comp/input.svelte';
  import { addTodo } from '@lib/query/todo';
  import { toastFailed, toastSuccess } from '@lib/utils/toast';
  import TodosSkeleton from '@comp/skeletons/todosSkeleton.svelte';
  import PageSkeleton from '@comp/skeletons/pageSkeleton.svelte';

  // import { getTodos } from '@lib/query/todo';

  let title = '';
  let desc = '';
  let deadline = new Date();
  let placeholder = 'What needs to be done?';
  let descPlaceholder = 'Add a description';
  let startPage = 0;
  let endPage = 9;
  let isLoading = false;

  let todos;

  const getTodos = async () => {
    isLoading = true;
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })
      .range(startPage, endPage);

    if (error) {
      console.log(error);
      toastFailed('Failed to load todos');
      isLoading = false;
    }
    if (data) {
      todos = data;
      isLoading = false;
    }
  };
</script>

{#await getTodos()}
  <PageSkeleton />
{:then}
  <div class="flex flex-col">
    <div class="flex justify-center items-center mt-4 w-full h-screen">
      <div
        class="flex flex-col w-1/2 px-40 border-r border-neutral-300 h-screen justify-center"
      >
        <Input title="Title" {placeholder} bind:value={title} />
        <Input
          title="Description"
          placeholder={descPlaceholder}
          bind:value={desc}
        />
        <Input title="Deadline" isDatePicker bind:value={deadline} />

        <button
          class="bg-green-700 p-2 rounded-md text-neutral-100"
          on:click={async () => {
            await addTodo(title, desc, deadline);
            toastSuccess(`ADD: ${title} is added!`);
            title = '';
            desc = '';
            deadline = new Date();
            await getTodos();
          }}>Add todo</button
        >
      </div>
      <div class="flex flex-col justify-center items-center gap-2 w-1/2">
        <h1 class="font-bold text-2xl mb-2">Your todo list</h1>
        {#if isLoading}
          {#each todos as item}
            <TodosSkeleton />
          {/each}
        {:else}
          {#each todos as todo}
            <Todos {todo} {getTodos} />
          {/each}
        {/if}
        <div class="flex gap-2">
          <button
            disabled={startPage === 0}
            class="p-2 bg-neutral-200 border border-neutral-300 rounded-md disabled:opacity-50 hover:bg-neutral-300"
            on:click={async () => {
              startPage -= 10;
              endPage -= 10;
              await getTodos();
            }}>Prev</button
          >
          <button
            disabled={endPage >= todos.length}
            class="p-2 bg-neutral-200 border border-neutral-300 rounded-md disabled:opacity-50 hover:bg-neutral-300"
            on:click={async () => {
              startPage += 10;
              endPage += 10;
              await getTodos();
            }}>Next</button
          >
        </div>
      </div>
    </div>
  </div>
{:catch name}
  <h1>Error!</h1>
{/await}
