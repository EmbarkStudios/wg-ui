<script>
  import { onMount } from 'svelte';
  import { Router, Link, Route } from "svelte-routing";
  import About from "./About.svelte";
  import Clients from "./Clients.svelte";
  import EditClient from "./EditClient.svelte";
  import Nav from "./Nav.svelte";

  import Cookie from "cookie-universal";
  const cookies = Cookie();
  export let user = cookies.get("wguser", { fromRes: true}) || "anonymous";

  export let url = "";
</script>

<Router url="{url}">
  <Nav user="{user}" />
  <main role="main" class="container">
    <div>
      <Route path="client/:clientId" component="{EditClient}" />
      <Route path="about" component="{About}" />
      <Route path="/"><Clients user="{user}" /></Route>
    </div>
  </main>
</Router>
