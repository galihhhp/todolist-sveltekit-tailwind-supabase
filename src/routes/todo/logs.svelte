<script>
  import supabase from '@lib/db';
  import { user } from '@lib/stores/user';
  import PageSkeleton from '@comp/skeletons/pageSkeleton.svelte';
  import { goto } from '$app/navigation';
  import FilterButton from '@comp/buttons/filterButton.svelte';
  import { filterItems } from '@lib/constants';
  import TodosSkeleton from '@comp/skeletons/todosSkeleton.svelte';

  let logs;
  let selectedFilter = filterItems[0];
  let isLoading = false;

  const getLogs = async () => {
    isLoading = true;
    const { data, error } = await supabase
      .from('logs')
      .select('*')
      .eq('user_id', $user?.id)
      .eq(selectedFilter !== 'all' ? 'type' : '', selectedFilter)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      isLoading = false;
    }
    if (data) {
      logs = data;
      isLoading = false;
    }
  };
  const selectFilterHandler = (e) => (selectedFilter = e.detail);

  $: selectedFilter, getLogs();
</script>

{#await getLogs()}
  <PageSkeleton />
{:then}
  <div class="flex flex-col w-full gap-2">
    <button
      class="p-2 border border-neutral-900 w-20 rounded-md"
      on:click={() => goto('/todo')}>&#8592; Back</button
    >
    <div class="self-end flex items-center w-48">
      <h2 class="w-1/2 text-md">Filter by:</h2>
      <FilterButton
        on:change={selectFilterHandler}
        selected={selectedFilter}
        item={filterItems}
        {getLogs}
      />
    </div>
    <table class="grid w-full">
      <tr
        class="grid grid-cols-3 text-left bg-neutral-700 text-neutral-100 p-2 rounded-md"
      >
        <th>Date</th>
        <th>Message</th>
        <th>Type</th>
      </tr>
      {#if isLoading}
        <TodosSkeleton isLogs />
        <TodosSkeleton isLogs />
        <TodosSkeleton isLogs />
        <TodosSkeleton isLogs />
        <TodosSkeleton isLogs />
      {:else if logs}
        {#if logs.length > 0}
          {#each logs as log}
            <tr class="grid grid-cols-3 p-2 border-b border-neutral-200">
              <td>{new Date(log.created_at).toDateString().slice(4)}</td>
              <td>{log.msg}</td>
              <td class="uppercase">{log.type}</td>
            </tr>
          {/each}
        {:else}
          <h1>
            <span class="text-neutral-200">No logs found</span>
          </h1>
        {/if}
      {/if}
    </table>
  </div>
{:catch}
  <h1>Error!</h1>
{/await}
