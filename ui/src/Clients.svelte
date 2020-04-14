<script>
  import Fab, {Label, Icon} from '@smui/fab';
  import { onMount } from 'svelte';
  import Client from './Client.svelte';
  import { link,navigate } from "svelte-routing";

  export let user;

  let clientsUrl = "/api/v1/users/" + user + "/clients";
  let clients = [];

  async function getClients() {
    const res = await fetch(clientsUrl);
		clients = Object.entries(await res.json());
    console.log("Fetched clients", clients);
  }


  function onCreateNewClient() {
    navigate("/newclient", { replace: true });
  }


	onMount(getClients);
</script>

<style>
.newClient {
  float: right;
}

h2 small {
  display: block;
  clear: left;
  color: #ccc;
}


.content {}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.col {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  margin-left: 2em;
}

.help {
flex-basis: 10%;
}

h2 {
margin: 0;
padding: 0;
}
</style>

<div class="content">
  <div class="row">
    <div class="col">
      <h2 class="mdc-typography--headline2">My VPN Clients<small class="mdc-typography--headline5">({user})</small></h2>
    </div>
    <div class="col help">
      <h3>Instructions</h3>
      <ol>
        <li><a href="https://www.wireguard.com/install/">Install WireGuard</a></li>
        <li>Download your WireGuard config</li>
        <li>Connect to the VPN server</li>
      </ol>
    </div>
  </div>

</div>

      {#each clients as dev}
        <Client user={user} client={dev}/>
      {/each}

      <div class="newClient">
        <Fab color="primary" on:click={onCreateNewClient}><Icon class="material-icons">add</Icon></Fab>
      </div>


