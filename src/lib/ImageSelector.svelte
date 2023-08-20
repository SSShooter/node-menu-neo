<script lang="ts">
  import type { MindElixirInstance } from 'mind-elixir'
  import images from './images'
  export let mei: MindElixirInstance
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
    mei.reshapeNode(mei.currentNode, {
      image: { url: e.currentTarget.src, width: 100, height: 100 },
    })
  }
</script>

<div>
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
  <input placeholder="image url" />
  <input placeholder="image width" />
</div>

<style lang="less">
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
