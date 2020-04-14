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

  const user = Cookie().get("wguser", { fromRes: true});

  let clientsUrl = "/api/v1/users/" + user + "/clients";

  let client = {};
  let clientName = "";
  let clientNotes = "";
  let deleteDialog;

  async function handleSubmit(event) {
    client.Name = clientName;
    client.Notes = clientNotes;
    const res = await fetch(clientsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then(response => {
        return response.json();
    })
    .then(data => {
      if (typeof data.Error != "undefined") {
          console.log(data.Error);
          alert(data.Error);
      } else {
        console.log("New client added", data);
      }
    });
    navigate("/", { replace: true });
  };


  function handleBackClick(event) {
    navigate("/", { replace: true });
  }

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

<h3 class="mdc-typography--headline3"><small>Create New Device Configuration</small></h3>

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

    <Button variant="raised"><Label>Create</Label></Button>
  </form>
</div>

