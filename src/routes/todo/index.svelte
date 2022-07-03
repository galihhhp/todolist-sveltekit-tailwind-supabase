<script>
  import supabase from '@lib/db';
  import Todos from '@pages/todos.svelte';
  import { toastFailed, toastSuccess } from '@lib/utils/toast';
  import TodosSkeleton from '@comp/skeletons/todosSkeleton.svelte';
  import PageSkeleton from '@comp/skeletons/pageSkeleton.svelte';
  import { user } from '@lib/stores/user';
  import AddTodo from '@comp/form/addTodo.svelte';
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from '@rgossiaux/svelte-headlessui';

  let isLoading = false;

  let todos;

  const getTodos = async () => {
    isLoading = true;
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })
      .eq('user_id', $user?.id);

    if (error) {
      console.log(error);
      // toastFailed('Failed to load todos');
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
    <div class="flex mt-4 w-full h-screen">
      <AddTodo {getTodos} {isLoading} />
      <div class="flex flex-col items-center gap-2 w-1/2">
        <h1 class="font-bold text-2xl mb-2">Your todo list</h1>
        {#if isLoading}
          {#each todos as item}
            <TodosSkeleton />
          {/each}
        {:else if todos}
          <TabGroup class="w-full gap-2">
            <TabList class="flex w-full justify-center gap-2 mb-2">
              <Tab
                class={({ selected }) =>
                  selected
                    ? 'text-neutral-200 w-1/5 font-bold bg-neutral-600 rounded-md p-2'
                    : 'text-neutral-900 w-1/5 p-2'}>Active</Tab
              >
              <Tab
                class={({ selected }) =>
                  selected
                    ? 'text-neutral-200 w-1/5 font-bold bg-neutral-600 rounded-md p-2'
                    : 'text-neutral-900 w-1/5 p-2'}>Done</Tab
              >
              <Tab
                class={({ selected }) =>
                  selected
                    ? 'text-neutral-200 w-1/5 font-bold bg-neutral-600 rounded-md p-2'
                    : 'text-neutral-900 w-1/5 p-2'}>Due</Tab
              >
            </TabList>
            <TabPanels>
              <TabPanel class="w-full items-center flex flex-col">
                {#each todos as todo}
                  <Todos {todo} {getTodos} tab={0} />
                {/each}
              </TabPanel>
              <TabPanel class="w-full items-center flex flex-col">
                {#each todos as todo}
                  <Todos {todo} {getTodos} tab={1} />
                {/each}
              </TabPanel>
              <TabPanel class="w-full items-center flex flex-col">
                {#each todos as todo}
                  <Todos {todo} {getTodos} tab={2} />
                {/each}
              </TabPanel>
            </TabPanels>
          </TabGroup>
        {:else}
          <div class="flex flex-col items-center gap-2">
            <h1 class="font-bold text-2xl mb-2">No todos yet</h1>
          </div>
        {/if}
      </div>
    </div>
  </div>
{:catch name}
  <h1>Error!</h1>
{/await}
