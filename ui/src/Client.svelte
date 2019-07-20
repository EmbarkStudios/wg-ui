<script>
  import { link } from "svelte-routing";

  export let client;

  let clientId = client[0];
  let dev = client[1];
</script>

<div>
  <h4>{client.Name}</h4>
  <dl>
    <dt>IP</dt><dd>{dev.IP}</dd>
    <dt>PrivateKey</dt><dd>{dev.PrivateKey}</dd>
    <dt>PublicKey</dt><dd>{dev.PublicKey}</dd>
  </dl>
<a href="/client/{clientId}" use:link role="button" class="btn btn-primary material-icons">
    edit
</a>
</div>
