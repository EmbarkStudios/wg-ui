<script>
  import { onMount } from 'svelte';
  import { link, navigate } from "svelte-routing";

  export let clientId;

  let clientUrl = `/api/v1/users/` + user + `/clients/` + clientId;

  let user = "anonymous";

  let client = {};

  async function getClient() {
    const res = await fetch(clientUrl);
    client = await res.json();
    console.log("Fetched client", client);
  }

  async function handleSubmit(event) {
    const res = await fetch(clientUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
    client = await res.json();
    console.log("Saved changes", res);
  }


  async function handleDeleteClick(event) {
    const res = await fetch(clientUrl, {
      method: "DELETE",
    });
    await res;
    navigate("/", { replace: true });
    console.log("Delete!");
  }

	onMount(getClient);
</script>

<style>
.container {
  margin-bottom: 2em;
}

button {
margin-top: 1em;
}

</style>

<div class="container">
  <h2>Client Properties <small class="text-muted"> {client.Name}</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="name" class="bmd-label-floating">Name</label>
      <input type="text" class="form-control" id="name" bind:value={client.Name}>
      <span class="bmd-help">Friendly name of client.</span>
    </div>

    <div class="form-group">
      <label for="notes" class="bmd-label-floating">Notes</label>
      <textarea class="form-control" id="notes" rows="3" bind:value={client.Notes}/>
      <span class="bmd-help">Notes about client.</span>
    </div>

    <button type="submit" class="btn btn-raised btn-primary">Save Changes</button>
  </form>
</div>

<div class="container">
  <h3>Additional Properties</h3>
  <dl class="row">
    <dt class="col-sm-2">IP Address</dt>
    <dd class="col-sm-10">{client.IP}</dd>
    <dt class="col-sm-2">Private Key</dt>
    <dd class="col-sm-10">{client.PrivateKey}</dd>
    <dt class="col-sm-2">Public Key</dt>
    <dd class="col-sm-10">{client.PublicKey}</dd>
  </dl>
</div>

<div class="container">
  <h3>Danger Zone</h3>
  <button type="button" class="btn btn-sm btn-secondary btn-raised btn-danger" data-toggle="modal" data-target="#deleteClient">
    Delete Client Config
  </button>

  <div class="modal fade" id="deleteClient" tabindex="-1" role="dialog" aria-labelledby="deleteClientLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteClientLabel">Delete {client.Name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this client configuration?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button on:click={handleDeleteClick} type="button" class="btn btn-primary btn-danger" data-dismiss="modal">Delete</button>
        </div>
      </div>
    </div>
  </div>

</div>
