<script>
  import { onMount } from 'svelte';
  import { link } from "svelte-routing";

  export let clientId;


  let user = "anonymous";

  let client = {};

	onMount(async () => {
		const res = await fetch(`/api/v1/users/` + user + `/clients/` + clientId);
		client = Object.entries(await res.json());
	});
</script>

<h2>Edit Client {client.Name}</h2>
<form>

<div class="form-group">
    <label for="name" class="bmd-label-floating">Client Name</label>
    <input type="email" class="form-control" id="name" value={client.Name}>
    <span class="bmd-help">Friendly name of client.</span>
  </div>
</form>
<p>
{client}
</p>
