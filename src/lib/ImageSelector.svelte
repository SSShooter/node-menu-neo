<script lang="ts">
  import type { MindElixirInstance, NodeObj } from 'mind-elixir'
  import images from './images'
  export let mei: MindElixirInstance
  export let currentNode: NodeObj
  $: currentUrl = currentNode.image?.url || ''
  $: currentH = currentNode.image?.height || 100
  $: currentW = currentNode.image?.width || 100

  const baseUrl = 'https://undraw-mirror.vercel.app/images/'
  let page = 1
  let currentImages = images.slice((page - 1) * 10, page * 10)
  const prevPage = () => {
    page -= 1
    currentImages = images.slice((page - 1) * 10, page * 10)
  }
  const nextPage = () => {
    page += 1
    currentImages = images.slice((page - 1) * 10, page * 10)
  }
  const handleImageChange = (e) => {
    currentUrl = e.currentTarget.src
  }
  const updateUrl = (e: any) => {
    currentUrl = e.target.value
  }
  const updateH = (e: any) => {
    currentH = e.target.value
  }
  const updateW = (e: any) => {
    currentW = e.target.value
  }
  $: {
    console.log(currentW, currentH, currentUrl)
    if (currentUrl) {
      mei.reshapeNode(mei.currentNode, {
        image: { url: currentUrl, width: currentW, height: currentH },
      })
    } else {
      mei.reshapeNode(mei.currentNode, {
        image: null,
      })
    }
  }
</script>

<div>
  <input placeholder="image url" value={currentUrl} on:blur={updateUrl} />
  <input placeholder="image height" value={currentH} on:blur={updateH} />
  <input placeholder="image width" value={currentW} on:blur={updateW} />
  <h3>Preset Images</h3>
  <div class="image-wrapper">
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
</div>

<style lang="less">
  button {
    border: none;
    background: none;
    cursor: pointer;
    margin: 18px 0;
  }
  .image-wrapper {
    display: flex;
    flex-wrap: wrap;
    .image {
      width: 100px;
      height: 100px;
      display: block;
      background: url(http://goo.gl/vyAs27) no-repeat scroll 0 0;
    }
  }
</style>
