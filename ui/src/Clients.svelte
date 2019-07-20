<script>
  import { onMount } from 'svelte';
	import Client from './Client.svelte';

  let user = "anonymous";

  let clients = [];

	onMount(async () => {
		const res = await fetch(`/api/v1/users/` + user + `/clients`);
		clients = Object.entries(await res.json());
	});
</script>


<h2>My Clients</h2>

<ul class="list-unstyled">
	{#each clients as dev}
    <li><Client client={dev}/></li>
  {/each}
</ul>

<button type="button" class="btn btn-primary bmd-btn-fab">
  <i class="material-icons">add</i>
</button>
