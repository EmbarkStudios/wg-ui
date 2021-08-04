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
  let allowedIPsText = "";
  let deleteDialog;

  function CIDRsubnetToNETIPMask(cidrmask){
    let bitmask = "".padStart(cidrmask,"1").padEnd(32,"0");
    return btoa(String.fromCharCode(
      parseInt(bitmask.slice(0,8),2),
      parseInt(bitmask.slice(8,16),2),
      parseInt(bitmask.slice(16,24),2),
      parseInt(bitmask.slice(24,32),2)))
  }
  
  function NETIPMaskToCIDRSubnet(bitmaskb64){
    let bitmask = atob(bitmaskb64).split("").map((x) => x.charCodeAt(0).toString(2).padStart(8,0)).join("");
    console.log(bitmask);
    let cidrmask = bitmask.lastIndexOf("1");
    return cidrmask == -1 ? 0 : cidrmask + 1
  }

  function convertTextCIDRsToNETIP(allowedIPsText){
    if (allowedIPsText.length == 0) {
      return null;
    }
    return allowedIPsText.split('\n').map(cidr => {
      if (cidr.length == 0){
        return null
      }else if (cidr.indexOf('/') != -1){
        let cidrsplit = cidr.split('/'); 
        return {IP: cidrsplit[0], Mask: CIDRsubnetToNETIPMask(parseInt(cidrsplit[1]))}
      }else{
        return {IP: cidr, Mask: btoa(32)}
      } 
    }).filter(x => !!x);
  }

  function convertNETIPToTextCIDRs(netIPs){
    return netIPs.map(netip => netip.IP+ "/"+ NETIPMaskToCIDRSubnet(netip.Mask)).join("\n")
  }

  async function getClient() {
    const res = await fetch(clientUrl);
    client = await res.json();
    clientName = client.Name;
    clientNotes = client.Notes;
    allowedIPsText = convertNETIPToTextCIDRs(client.AllowedIPs)
    console.log("Fetched client", client);
  }

  async function handleSubmit(event) {
    client.Name = clientName;
    client.Notes = clientNotes;
    client.AllowedIPs = convertTextCIDRsToNETIP(allowedIPsText);
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
        <div class="margins">
            <Textfield
                input$id="allowedIps"
                fullwidth
                textarea
                bind:value={allowedIPsText}
                label="Allowed IPs"
                input$aria-controls="client-allowedIps"
                input$aria-describedby="client-allowedIps"
            />
            <HelperText id="client-notes-help"
                >Additional allowed CIDR blocks accessible via the client separated by a newline</HelperText
            >
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
    <dt>Preshared Key</dt>
    <dd>{client.PresharedKey}</dd>
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
