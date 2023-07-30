import type { MindElixirInstance } from 'mind-elixir'
import NodeMenuNeo from './NodeMenuNeo.svelte'

export default function (mei: MindElixirInstance) {
  const nodeMenu = document.createElement('div')
  mei.container.append(nodeMenu)
  const app = new NodeMenuNeo({
    target: nodeMenu,
    props: {
      mei,
    },
  })
}
