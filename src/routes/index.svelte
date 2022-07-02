<script>
  import { goto } from '$app/navigation';
  import supabase from '@lib/db';
  import { user } from '@lib/stores/user';
  import Input from '@comp/input.svelte';
  import { toastFailed, toastSuccess } from '@lib/utils/toast';
  import { fade } from 'svelte/transition';
  // import AuthWrapper from '@comp/auth/authWrapper.svelte';

  let loading = false;
  let email = '';
  let password = '';
  let isSuccessful = false;
  let isForgotPassword = false;

  const handleLogin = async () => {
    try {
      loading = true;
      const { user, error } = await supabase.auth.signIn({
        email: 'pangestu.galihhhp@gmail.com',
      });
      if (error) throw error;
      console.log(user);
      toastSuccess();
      loading = false;
      isSuccessful = true;
    } catch (error) {
      toastFailed();
      loading = false;
    }
  };
</script>

<div class="flex flex-col justify-center items-center h-screen gap-2">
  <h1 class="font-bold text-2xl text-neutral-900">Login with your email</h1>
  <div
    class="flex flex-col justify-center border shadow-md border-neutral-900 bg-neutral-300 rounded-md w-1/3 h-1/5 px-10"
  >
    {#if !isSuccessful}
      {#if loading}
        <div
          class="animate-ping w-12 h-12 bg-green-700 rounded-full mx-auto"
          out:fade|local
        />
      {:else}
        <Input
          title="Email"
          placeholder="Input your email"
          bind:value={email}
        />
        <button
          class="p-2 bg-green-700 rounded-md text-neutral-100"
          on:click={async () => await handleLogin()}
        >
          Login
        </button>
      {/if}
    {:else}
      <h1 class="text-xl font-semibold" in:fade|local>
        Please check your email and click the link to login
      </h1>
    {/if}
  </div>
</div>

<!-- <div>asfas</div>
<button on:click={async () => await handleLogin()}> asdfgsd </button> -->
