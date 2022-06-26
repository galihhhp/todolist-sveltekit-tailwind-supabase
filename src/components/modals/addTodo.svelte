<script>
  import TagDropdown from '@comp/tagDropdown.svelte';
  import supabase from '@lib/db';
  import { tags } from '@lib/constants';
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    Transition,
  } from '@rgossiaux/svelte-headlessui';
  import { slide, fade } from 'svelte/transition';
  import Input from '@comp/input.svelte';

  let isOpen = true;
  let title = '';
  let desc = '';
  let selectedTag = tags[0];

  const toggleModal = () => (isOpen = !isOpen);

  const addTodo = async () => {
    const { error } = await supabase
      .from('todos')
      .insert(
        { title: title, desc: desc, tag: selectedTag },
        { returning: 'minimal' }
      );
    if (error) console.log(error);
  };

  const selectTagHandler = (e) => (selectedTag = e.detail);
  $: console.log(selectedTag);
</script>

<button on:click={toggleModal}>Add Todo +</button>

<Dialog
  open={isOpen}
  on:close={() => (isOpen = false)}
  class={`top-0 w-full absolute z-50 bg-stone-600 flex flex-col justify-center items-center shadow-lg text-neutral-200 p-4 transition-transform duration-500 ${
    isOpen ? 'translate-y-0' : '-translate-y-96'
  }`}
  static
>
  <DialogOverlay />
  <DialogTitle class="text-3xl pb-2 font-bold w-full text-center"
    >Add Todo</DialogTitle
  >
  <DialogDescription class="mt-4" />
  <div class="flex flex-col w-1/3 gap-2">
    <Input title="Title" placeholder="Your title" bind:value={title} />
    <Input
      title="Description"
      placeholder="Your Desccription"
      bind:value={desc}
    />
    <TagDropdown on:change={selectTagHandler} {selectedTag} {tags} />
  </div>
  <!-- 
  <p>
    Are you sure you want to deactivate your account? All of your data will be
    permanently removed. This action cannot be undone.
  </p> -->

  <div class="flex w-full mt-8">
    <button
      class="w-1/2 bg-red-700 text-neutral-200 p-2"
      on:click={() => (isOpen = false)}>Cancel</button
    >
    <button
      class="w-1/2 bg-green-700 text-neutral-200 p-2"
      on:click={async () => await addTodo()}>Add</button
    >
  </div>
</Dialog>
