<svelte:head>
  <title>WireGuard VPN</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { Router, Link, Route } from "svelte-routing";
  import About from "./About.svelte";
  import Clients from "./Clients.svelte";
  import EditClient from "./EditClient.svelte";
  import Nav from "./Nav.svelte";
  import NewClient from "./NewClient.svelte";

  import Cookie from "cookie-universal";
  const cookies = Cookie();
  export let user = cookies.get("wguser", { fromRes: true}) || "anonymous";

  export let url = "";
</script>

<style>
main {
/*  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
*/

}
footer {
  margin-top: 3em;
  border-top: 1px solid #ddd;
  text-align: center;
  background: #f7f7f7;
}
</style>

<div class="mdc-typography">

  <Router url="{url}">

    <Nav user="{user}" />

    <main role="main" class="container">
      <div>
        <Route path="client/:clientId" component="{EditClient}" />
        <Route path="newclient/" component="{NewClient}" />
        <Route path="about" component="{About}" />
        <Route path="/"><Clients user="{user}" /></Route>
      </div>
    </main>

  </Router>

  <footer>
    <p>
      Powered by <a href="https://github.com/EmbarkStudios/wireguard-ui">WireGuard UI</a>.
    </p>
    <p>
      Copyright &copy; 2019 <a href="https://embark-studios.com">Embark Studios</a>.
    </p>
  </footer>
</div>
