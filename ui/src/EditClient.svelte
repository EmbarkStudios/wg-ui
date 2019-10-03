<script>
  import Fab, {Label, Icon} from '@smui/fab';
  import Dialog, {Actions, InitialFocus} from '@smui/dialog';
  import Textfield, {Input, Textarea} from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text/index';
  import Button, {Group, GroupItem} from '@smui/button';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';

  import Cookie from "cookie-universal";
  import { onMount } from 'svelte';
  import { link, navigate } from "svelte-routing";

  export let clientId;

  const user = Cookie().get("wguser", { fromRes: true});

  const clientUrl = `/api/v1/users/` + user + `/clients/` + clientId;

  let client = {};
  let clientName = "";
  let clientNotes = "";
  let deleteDialog;

  async function getClient() {
    const res = await fetch(clientUrl);
    client = await res.json();
    clientName = client.Name;
    clientNotes = client.Notes;
    console.log("Fetched client", client);
  }

  async function handleSubmit(event) {
    client.Name = clientName;
    client.Notes = clientNotes;
    const res = await fetch(clientUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
    client = await res.json();
    navigate("/", { replace: true });
    console.log("Saved changes", res);
  }


  function handleBackClick(event) {
    navigate("/", { replace: true });
  }

  async function deleteHandler(e) {
    switch (e.detail.action) {
      case 'delete':
        const res = await fetch(clientUrl, {
          method: "DELETE",
        });
        await res;
        navigate("/", { replace: true });
        break;
      default:
        break;
    }
  }

	onMount(getClient);
</script>

<style>
  .back {
    position: fixed;
    left: 10px;
    top: 70px;
  }
</style>

<div class="back">
<Fab color="primary" on:click={handleBackClick}><Icon class="material-icons">arrow_back</Icon></Fab>
</div>

<h3 class="mdc-typography--headline3">Client Properties <small class="text-muted">({client.Name})</small></h3>

<div class="container">


  <form on:submit|preventDefault={handleSubmit}>

    <div class="margins">
      <Textfield input$id="name" bind:value={clientName} variant="outlined" label="Client Name" input$aria-controls="client-name" input$aria-describedby="client-name-help" />
      <HelperText id="client-name-help">Friendly name of client / device</HelperText>
    </div>

    <div class="margins">
      <Textfield input$id="notes" fullwidth textarea bind:value={clientNotes} label="Label" input$aria-controls="client-notes" input$aria-describedby="client-notes-help" />
      <HelperText id="client-notes-help">Notes about the client.</HelperText>
    </div>

    <Button variant="raised"><Label>Save Changes</Label></Button>
  </form>
</div>

<div class="container">
  <h3 class="mdc-typography--headline5">Additional Properties</h3>
  <dl>
    <dt>IP Address</dt>
    <dd>{client.IP}</dd>
    <dt>Private Key</dt>
    <dd>{client.PrivateKey}</dd>
    <dt>Public Key</dt>
    <dd>{client.PublicKey}</dd>
  </dl>
</div>

<div class="container">
  <h3 class="mdc-typography--headline4">Danger Zone</h3>

  <Dialog bind:this={deleteDialog} aria-labelledby="delete-title" aria-describedby="delete-content" on:MDCDialog:closed={deleteHandler}>
  <div class="container">
    <Title id="delete-title">Delete Client Config</Title>
    <Content id="delete-content">
      Are you sure you want to delete this client configuration?
    </Content>
    <Actions>
      <Button action="none">
        <Label>No</Label>
      </Button>
      <Button action="delete" default use={[InitialFocus]}>
        <Label>Yes</Label>
      </Button>
    </Actions>
    </div>
  </Dialog>

  <Button id="delete" variant="raised" on:click={() => deleteDialog.open()}><Label>Delete Client Config</Label></Button>

</div>
