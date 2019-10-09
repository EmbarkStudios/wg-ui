<script>
  import Button, {Group, GroupItem, Label} from '@smui/button';
  import IconButton, {Icon} from '@smui/icon-button';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';
  import { link,navigate } from "svelte-routing";


  export let client;
  export let user;

  let clientId = client[0];
  let dev = client[1];

  var hash = 0;
  for (var i = 0; i < dev.PrivateKey.length; i++) {
    hash = dev.PrivateKey.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = "hsl(" + (hash % 360) + ",50%,95%)";

  function onEdit() {
    navigate("/client/" + clientId, { replace: true });
  }
</script>

<style>
  @media screen and (max-width: 800px) {
    img {
      display: none;
    }
  }

  img {
    margin-right: 40px;
    border: 1px solid #ccc;
  }

  .download {
    margin-top: 2em;
  }
</style>

<Paper elevation="8" style="background-color: {color}; margin: 2em 0;" class="card">

  <div class="float-right">
    <IconButton class="float-right material-icons" on:click={onEdit}>edit</IconButton>
  </div>


  <img src="/api/v1/users/{user}/clients/{clientId}?format=qrcode" class="qrcode float-right" alt="Mobile client config"/>

  <i class="material-icons" aria-hidden="true">devices</i>
  <h3 class="mdc-typography--headline5">
  {dev.Name}</h3>

  <dl>
    <dt>IP</dt>
    <dd>{dev.IP}</dd>
    <dt>Public Key</dt>
    <dd>{dev.PublicKey}</dd>
  </dl>

  <div class="download">
    <Button  href="/api/v1/users/{user}/clients/{clientId}?format=config" variant="raised"><Label>Download Config</Label></Button>
  </div>
</Paper>
