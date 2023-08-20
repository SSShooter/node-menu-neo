<script lang="ts">
  import './global.less'
  import { colorList } from './colors'
  import '../iconfont/iconfont.css'
  import i18n from '../i18n'
  import ImageSelector from './ImageSelector.svelte'
  import type { MindElixirInstance } from 'mind-elixir'
  export let mei: MindElixirInstance
  let locale
  const sizeList = ['15', '24', '32']

  const handleSizeChange = (e) => {
    console.log(e)
    size = e.currentTarget.dataset.size
    mei.reshapeNode(mei.currentNode, {
      style: { fontSize: e.currentTarget.dataset.size },
    })
  }
  const handleBold = (e) => {
    if (bold) {
      bold = ''
    } else {
      bold = 'bold'
    }
    mei.reshapeNode(mei.currentNode, { style: { fontWeight: bold } })
  }
  const handleColorChange = (e) => {
    if (!mei.currentNode) return
    if (bgOrFont === 'font') {
      mei.reshapeNode(mei.currentNode, {
        style: { color: e.target.dataset.color },
      })
    } else {
      mei.reshapeNode(mei.currentNode, {
        style: { background: e.target.dataset.color },
      })
    }
  }
  const handleArrayUpdate = (e, type) => {
    if (typeof e.target.value === 'string') {
      const newTags = e.target.value.split(',')
      mei.reshapeNode(mei.currentNode, { [type]: newTags.filter((tag) => tag) })
    }
  }
  let currentNode = null
  let size = null
  let color = null
  let bold = null
  let tags = ''
  let icons = ''
  let bgOrFont = 'font'

  let isExpand = true

  $: {
    if (bgOrFont === 'font') {
      color = currentNode?.style?.color
    } else {
      color = currentNode?.style?.background
    }
  }
  $: {
    if (mei) {
      locale = i18n[mei.locale] ? mei.locale : 'en'
      mei.bus.addListener('selectNode', function (nodeObj, clickEvent) {
        if (!clickEvent) return
        console.log(nodeObj)
        currentNode = nodeObj
        // menuContainer.hidden = false
        size = null
        color = null
        bold = null
        bgOrFont = 'font'
        if (nodeObj.style) {
          if (nodeObj.style.fontSize) {
            size = nodeObj.style.fontSize
          }
          if (nodeObj.style.fontWeight) {
            bold = nodeObj.style.fontWeight
          }
          if (nodeObj.style.color) {
            color = nodeObj.style.color
          }
        }
        if (nodeObj.tags) {
          tags = nodeObj.tags.join(',')
        } else {
          tags = ''
        }
        if (nodeObj.icons) {
          icons = nodeObj.icons.join(',')
        } else {
          icons = ''
        }
        // urlInput.value = nodeObj.hyperLink || ''
        // memoInput.value = nodeObj.memo || ''
      })
      mei.bus.addListener('unselectNode', function () {
        currentNode = null
      })
    }
  }
</script>

{#if currentNode}
  <div class="node-menu">
    <div class="button-container">
      <button
        class="iconfont icon-{isExpand ? 'close' : 'menu'}"
        on:click={() => {
          isExpand = !isExpand
        }}
      />
    </div>
    {#if isExpand}
      <div>
        <div class="nm-fontsize-container">
          {#each sizeList as s}
            <button
              class="size {size === s ? 'size-selected' : ''}"
              data-size={s}
              on:click={handleSizeChange}
            >
              <span style="font-size: {s}px;" class="iconfont icon-a" />
            </button>
          {/each}
          <button
            class="bold {bold === 'bold' ? 'size-selected' : ''}"
            on:click={handleBold}
          >
            <span class="iconfont icon-B" />
          </button>
        </div>
        <div class="nm-fontcolor-container">
          {#each colorList as c}
            <div class="split6">
              <button
                on:click={handleColorChange}
                class="palette {color === c ? 'selected' : ''}"
                data-color={c}
                style="background-color: {c};"
              />
            </div>
          {/each}
        </div>
        <div class="bg-or-font">
          <button
            class="font {bgOrFont === 'font' ? 'selected' : ''}"
            on:click={() => (bgOrFont = 'font')}
          >
            {i18n[locale].font}
          </button>
          <button
            class="background {bgOrFont === 'background' ? 'selected' : ''}"
            on:click={() => (bgOrFont = 'background')}
          >
            {i18n[locale].background}
          </button>
        </div>
        {i18n[locale].tag}<input
          class="nm-tag"
          tabindex="-1"
          value={tags}
          placeholder={i18n[locale].tagsSeparate}
          on:change={(e) => handleArrayUpdate(e, 'tags')}
        />
        {i18n[locale].icon}<input
          class="nm-icon"
          tabindex="-1"
          value={icons}
          placeholder={i18n[locale].iconsSeparate}
          on:change={(e) => handleArrayUpdate(e, 'icons')}
        />
        {i18n[locale].url}<input
          class="nm-url"
          tabindex="-1"
          bind:value={currentNode.hyperLink}
        />
        {'Memo'}<textarea
          class="nm-memo"
          rows="5"
          tabindex="-1"
          bind:value={currentNode.memo}
        />
      </div>
      <ImageSelector {mei} />
    {/if}
  </div>
{/if}

<style lang="less">
  // .mind-elixir
  .node-menu {
    position: absolute;
    right: 20px;
    top: 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    width: 240px;
    box-sizing: border-box;
    padding: 0 15px;
    transition: 0.3s all;
    button {
      border: none;
      background: none;
      cursor: pointer;
    }
    .button-container {
      padding: 6px 0;
      text-align: center;
      //   border-bottom: 1px solid #ccc;
    }
    .nm-fontsize-container {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      button {
        height: 36px;
        width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        background-color: white;
        color: tomato;
        border-radius: 100%;
      }
    }
    .nm-fontcolor-container {
      margin-bottom: 10px;
    }
    textarea {
      resize: none;
    }
    .split6 {
      display: inline-block;
      width: 16.66%;
      margin-bottom: 5px;
    }
    .palette {
      border-radius: 100%;
      width: 21px;
      height: 21px;
      border: 1px solid #edf1f2;
      margin: auto;
    }
    .selected,
    .palette:hover {
      box-shadow: tomato 0 0 0 2px;
      background-color: #c7e9fa;
    }
    .size-selected {
      background-color: tomato !important;
      border-color: tomato;
      fill: white;
      color: white !important;
    }
    .bg-or-font {
      text-align: center;
      button {
        display: inline-block;
        font-size: 14px;
        border-radius: 4px;
        padding: 2px 5px;
        cursor: pointer;
      }
      .selected {
        background-color: tomato;
        color: white;
      }
    }
  }
</style>
