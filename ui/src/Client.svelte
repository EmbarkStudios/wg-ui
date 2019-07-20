<script>
  import { link } from "svelte-routing";

  export let client;
  export let user;

  let clientId = client[0];
  let dev = client[1];
</script>

<style>
.card {
  margin: 1em 0;
}
</style>

<div class="card">
  <div class="card-body">
  <a href="/client/{clientId}" use:link role="button" class="btn btn-secondary material-icons float-right">edit</a>

    <h4 class="card-title">{client.Name}</h4>
    <dl class="row">
      <dt class="col-sm-2">IP</dt>
      <dd class="col-sm-10">{dev.IP}</dd>
      <dt class="col-sm-2">Public Key</dt>
      <dd class="col-sm-10">{dev.PublicKey}</dd>
    </dl>

  <a href="/api/v1/users/{user}/clients/{clientId}?format=config" role="button" class="btn btn-raised btn-primary">Download Config</a>

  </div>

</div>
