<script>
  import { onMount } from 'svelte';
	import Client from './Client.svelte';

  export let user;

  let clientsUrl = "/api/v1/users/" + user + "/clients";
  let clients = [];

  async function getClients() {
    const res = await fetch(clientsUrl);
		clients = Object.entries(await res.json());
    console.log("Fetched clients", clients);
  }

  async function handleNewClick(event) {
    const res = await fetch(clientsUrl, {
      method: "POST",
    }).then(getClients());
    let newClient = await res.json();
    console.log("New client added", newClient);
  }

	onMount(getClients);
</script>

<h2>My Clients <small class="text-muted">({user})</small></h2>

<ul class="list-unstyled">
	{#each clients as dev}
    <li><Client user={user} client={dev}/></li>
  {/each}
</ul>

<button on:click={handleNewClick} type="button" class="btn btn-primary bmd-btn-fab float-right">
  <i class="material-icons">add</i>
</button>
