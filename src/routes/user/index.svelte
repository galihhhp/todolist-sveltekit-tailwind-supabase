<script>
  import supabase from '@lib/db';

  let todos;

  const getTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.log(error);
    if (data) todos = data;
  };

  const addTodo = async () => {
    const { error } = await supabase
      .from('todos')
      .insert({ title: 'TEST', desc: 'TEST' }, { returning: 'minimal' });
    if (error) console.log(error);
    // location.reload();
  };

  const toggleTodo = async (id) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_completed: true }, { returning: 'minimal' })
      .eq('id', id);
    if (error) console.log(error);
    // location.reload();
  };
  // $: getTodos();
  $: console.log(todos);
</script>

{#await getTodos()}
  <h1>Load...</h1>
{:then name}
  <div class="flex flex-col">
    <div
      class="flex justify-between items-center h-40 border-b-2 border-neutral-800"
    >
      <h1 class="text-4xl font-bold">Todo</h1>
      <button>asfa</button>
    </div>
    <div class="flex justify-around mt-4">
      <div class="p-2  w-1/4 rounded-md font-bold text-md">
        <h1 class="text-xl mb-4">Todo</h1>
        {#each todos as todo}
          {#if !todo.is_completed && !todo.is_process}
            <div
              class="bg-neutral-100 mb-4 text-neutral-900 p-4 rounded-md"
              on:click={async () => toggleTodo(todo.id)}
            >
              <h1>{todo.title ?? '-'}</h1>
              <p>{todo.id}</p>
              <p>{todo.desc ?? '-'}</p>
            </div>
          {/if}
        {/each}
      </div>
      <div class="p-2 w-1/4 rounded-md font-bold text-md">
        <h1 class="text-xl mb-4">Progress</h1>
        {#each todos as todo}
          {#if !todo.is_completed && todo.is_process}
            <div
              class="bg-neutral-100 mb-4 text-neutral-900 p-4 rounded-md"
              on:click={async () => toggleTodo(todo.id)}
            >
              <h1>{todo.title ?? '-'}</h1>
              <p>{todo.id}</p>
              <p>{todo.desc ?? '-'}</p>
            </div>
          {/if}
        {/each}
      </div>
      <div class="p-2 w-1/4 rounded-md font-bold text-md">
        <h1 class="text-xl mb-4">Completed</h1>
        {#each todos as todo}
          {#if todo.is_completed && !todo.is_process}
            <div
              class="bg-neutral-100 mb-4 text-neutral-900 p-4 rounded-md"
              on:click={async () => toggleTodo(todo.id)}
            >
              <h1>{todo.title ?? '-'}</h1>
              <p>{todo.id}</p>
              <p>{todo.desc ?? '-'}</p>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>

  <button on:click={addTodo}>ADD</button>
{:catch name}
  <h1>Error!</h1>
{/await}
