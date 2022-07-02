<script>
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import AuthWrapper from '@comp/auth/authWrapper.svelte';
</script>

<AuthWrapper>
  <div class="relative min-h-screen bg-neutral-100 text-neutral-900 p-4 wrap">
    <SvelteToast />
    <slot />
  </div>
</AuthWrapper>

<style>
  .wrap {
    --toastContainerTop: 0.5rem;
    --toastContainerRight: 0.5rem;
    --toastContainerBottom: auto;
    --toastContainerLeft: 0.5rem;
    --toastWidth: 100%;
    --toastMinHeight: 2rem;
    --toastPadding: 0 0.5rem;
    font-size: 0.875rem;
  }
  @media (min-width: 40rem) {
    .wrap {
      --toastContainerRight: auto;
      --toastContainerLeft: calc(50vw - 20rem);
      --toastWidth: 40rem;
    }
  }
</style>
