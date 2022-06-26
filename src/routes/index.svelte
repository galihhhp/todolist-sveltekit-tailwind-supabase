<script>
  import { goto } from '$app/navigation';
  import supabase from '@lib/db';
  import { user } from '@lib/stores/user';
  // import AuthWrapper from '@comp/auth/authWrapper.svelte';

  let loading = false;
  let email = '';
  let password = '';
  let isSuccessful = false;
  let isForgotPassword = false;
  $: console.log(supabase.auth.user());
  const handleLogin = async () => {
    try {
      loading = true;
      const { user, error } = await supabase.auth.signIn({
        email: 'pangestu.galihhhp@gmail.com',
      });
      if (error) throw error;
      console.log(user);
      loading = false;
      isSuccessful = true;
    } catch (error) {
      loading = false;
    }
  };
</script>

<div>asfas</div>
<button on:click={async () => await handleLogin()}> asdfgsd </button>
