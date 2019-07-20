<script>
  import { link } from "svelte-routing";

  export let client;

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
    <h4 class="card-title">{client.Name}</h4>
    <dl class="row">
      <dt class="col-sm-2">IP</dt>
      <dd class="col-sm-10">{dev.IP}</dd>
      <dt class="col-sm-2">Public Key</dt>
      <dd class="col-sm-10">{dev.PublicKey}</dd>
    </dl>

  <a href="/client/{clientId}/config" role="button" class="btn btn-primary">Download Config</a>
  <a href="/client/{clientId}" use:link role="button" class="btn btn-primary material-icons float-right">edit</a>
  </div>

</div>
