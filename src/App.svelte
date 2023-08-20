<script lang="ts">
  import { onMount } from 'svelte'

  import MindElixir, { type MindElixirInstance } from 'mind-elixir'
  import example from 'mind-elixir/example'
  // import NodeMenuNeo from '../dist/node-menu-neo'
  // import '../dist/style.css'
  import NodeMenuNeo from './lib/index'
  let mei: MindElixirInstance
  onMount(() => {
    mei = new MindElixir({
      el: '#map',
      direction: MindElixir.LEFT,
    })
    mei.install(NodeMenuNeo)
    mei.init(example)
  })
</script>

<main>
  <div id="map" />
</main>

<style>
  #map {
    width: 100%;
    height: 500px;
  }
</style>
