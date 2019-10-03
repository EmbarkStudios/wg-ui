<script>
  import TopAppBar, {Row, Section, Title} from "@smui/top-app-bar";
  import { Router, Link, Route } from "svelte-routing";
  import About from "./About.svelte";
  import Clients from "./Clients.svelte";
  import NavLink from "./NavLink.svelte";

  export let user;
</script>

<TopAppBar variant="static" color="primary">
  <Row>
    <Section>
      <Title>Wireguard VPN</Title>
    </Section>
    <Section align="end" toolbar>
     Logged in as {user}
    </Section>
  </Row>
</TopAppBar>
