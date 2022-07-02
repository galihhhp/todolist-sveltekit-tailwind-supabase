<script>
  import { deleteTodo, toggleTodo } from '@lib/query/todo';
  import { user } from '@lib/stores/user';

  export let todo, getTodos;
  let isToggleClicked = false;
  let isLoading = true;
  let isTomorrow = false;
  let isLate = false;
  const today = new Date();
  const tomorrow = new Date();
  const beforeToday = new Date();
  tomorrow.setDate(today.getDate() + 1);
  beforeToday.setDate(today.getDate() - 1);

  $: tomorrow.toDateString() === new Date(todo.deadline).toDateString()
    ? (isTomorrow = true)
    : (isTomorrow = false);
  $: beforeToday.toDateString() === new Date(todo.deadline).toDateString()
    ? (isLate = true)
    : (isLate = false);
</script>

{#if !todo.done}
  <div
    class={`flex-col p-2 w-2/3 rounded-md text-md border ${
      isTomorrow ? 'border-red-500' : 'border-neutral-900'
    } transition-all duration-500 ease-in-out h-12 hover:h-32 group ${
      isToggleClicked ? 'hidden' : 'flex'
    } ${isLate ? 'opacity-50' : 'opacity-100'}`}
  >
    <div class="flex justify-between w-full">
      <h1 class="font-bold">{todo.title}</h1>
      <div
        class="bg-green-700 p-2 rounded-md cursor-pointer"
        on:click={async () => {
          await toggleTodo(todo.id, true, todo.title, $user?.id);
          setTimeout(() => {
            isLoading = false;
          }, 500);
          if (isLoading) isToggleClicked = true;
          await getTodos();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
    <div
      class="hidden group-hover:flex flex-col transition-opacity duration-1000"
    >
      <p>
        Deadline: {new Date(todo.deadline).toDateString().slice(4)}
      </p>
      <p>Description: {todo.desc}</p>
      <div
        class="self-end bg-red-700 p-2 rounded-md cursor-pointer"
        on:click={async () => {
          await deleteTodo(todo.id, todo.title, $user?.id);
          setTimeout(() => {
            isLoading = false;
          }, 500);
          if (isLoading) isToggleClicked = true;
          await getTodos();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  </div>
{/if}
