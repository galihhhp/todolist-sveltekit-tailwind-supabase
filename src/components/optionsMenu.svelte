<script>
  import supabase from '@lib/db';

  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from '@rgossiaux/svelte-headlessui';
  import { deleteTodo, toggleTodo } from '@lib/query/todo';

  export let todo;
</script>

<Menu>
  <MenuButton>Options</MenuButton>
  <MenuItems
    class="flex flex-col absolute bg-neutral-200 border border-neutral-700 rounded-md"
  >
    <!--Use the `active` slot prop to conditionally style the active item.-->
    <MenuItem let:active>
      <p
        on:click={async () => deleteTodo(todo.id)}
        class={`${
          active ? 'bg-neutral-500 p-2 cursor-pointer' : 'p-2 cursor-pointer'
        }`}
      >
        Delete
      </p>
    </MenuItem>
    <MenuItem let:active>
      <!-- <EditTodo {todo} {active} /> -->
      <!-- <p
        class={`${
          active ? 'bg-neutral-500 p-2 cursor-pointer' : 'p-2 cursor-pointer'
        }`}
      >
        Edit
      </p> -->
    </MenuItem>
    <MenuItem let:active>
      <p
        on:click={async () => await toggleTodo(todo.id, 'process')}
        class={`${
          active ? 'bg-neutral-500 p-2 cursor-pointer' : 'p-2 cursor-pointer'
        }`}
      >
        Process
      </p>
    </MenuItem>
    <MenuItem let:active>
      <p
        on:click={async () => await toggleTodo(todo.id, 'completed')}
        class={`${
          active ? 'bg-neutral-500 p-2 cursor-pointer' : 'p-2 cursor-pointer'
        }`}
      >
        Completed
      </p>
    </MenuItem>
    <!-- ... -->
  </MenuItems>
</Menu>
