<script lang="ts">
  import type { MindElixirInstance } from 'mind-elixir'
  import images from './images'
  export let mei: MindElixirInstance
  const baseUrl = 'https://undraw-mirror.vercel.app/images/'
  let page = 0
  let currentImages = []
  const prevPage = () => {
    page -= 1
    currentImages = images.splice(page * 10, 10)
  }
  const nextPage = () => {
    page += 1
    currentImages = images.splice(page * 10, 10)
  }
  nextPage()
  const handleImageChange = (e) => {
    mei.reshapeNode(mei.currentNode, {
      style: { fontSize: e.currentTarget.dataset.size },
    })
  }
</script>

<div>
  <div>
    {#each currentImages as image, i}
      <img
        class="image"
        src="{baseUrl + image}.svg"
        alt={image}
        on:click={handleImageChange}
      />
    {/each}
  </div>
  <button on:click={prevPage} disabled={page < 2}>Prev</button>
  <button on:click={nextPage}>Next</button>
  <input placeholder="image url" />
  <input placeholder="image width" />
</div>

<style lang="less">
  .image {
    width: 100px;
    height: 100px;
  }
</style>
