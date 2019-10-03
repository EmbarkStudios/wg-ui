<script>
  import Fab, {Label, Icon} from '@smui/fab';
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

<style>
.newClient {
  float: right;
}
</style>

<h2>My Clients <small class="text-muted">({user})</small></h2>

	{#each clients as dev}
    <Client user={user} client={dev}/>
  {/each}

<div class="newClient">
<Fab color="primary" on:click={handleNewClick}><Icon class="material-icons">add</Icon></Fab>
</div>
