<script>
  import { link } from "svelte-routing";

  export let client;
  export let user;

  let clientId = client[0];
  let dev = client[1];

  var hash = 0;
  for (var i = 0; i < dev.PrivateKey.length; i++) {
    hash = dev.PrivateKey.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = "hsl(" + (hash % 360) + ",50%,95%)";
</script>

<style>
.card {
  margin: 1em 0;
}
</style>

<div class="card">
  <div class="card-body" style="background-color: {color}">

  <a href="/client/{clientId}" use:link replace role="button" class="btn btn-secondary material-icons float-right">edit</a>
    <i class="material-icons" aria-hidden="true">devices</i>
   <img src="/api/v1/users/{user}/clients/{clientId}?format=qrcode" class="qrcode float-right" alt="Mobile client config"/>
    <h4 class="card-title">{dev.Name}</h4>
    <dl class="row">
      <dt class="col-sm-2">IP</dt>
      <dd class="col-sm-10">{dev.IP}</dd>
      <dt class="col-sm-2">Public Key</dt>
      <dd class="col-sm-10">{dev.PublicKey}</dd>
    </dl>

    <a href="/api/v1/users/{user}/clients/{clientId}?format=config" role="button" class="btn btn-raised btn-primary">Download Config</a>
  </div>

</div>
