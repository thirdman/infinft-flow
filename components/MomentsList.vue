<template>
  <div id="MomentsList">
    
    <div
      class="galleryGrid"
      :class="displayMode"
      v-if="moments.length > 0"
    >
      <div v-for="(item, index) in moments" :key="index">
        <a
          v-bind:key="index"
          class="gallerylistItem"
          @click="handleLink(item, galleryContractId)"
        >
        
          <div class="galleryImageWrap">
            <img
              :src="
                item.Hero
              "
              class="galleryItemImage"
              v-if="item.Hero"
            />
            
          </div>
          <div class="galleryListItemContent">
            <label>
              {{ item.FullName }}
            </label>
            <div class="metaContent">
            <p class="help">{{item.CurrentTeam}}</p>
            <p class="help">{{item.PlayType}}</p>
            <p class="help">{{item.DateOfMoment}}</p>
            </div>
            
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style>
#galleryList,
.sets {
  width: 100%;
}
.sets {
  padding: 1rem 0;
  border-bottom: 1px solid var(--line-color);
  margin-bottom: 1rem;
}
.sets > label {
  font-size: 0.875rem;
}
.sets .filterContent {
  font-size: 0.875rem;
}
.galleryGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(8rem, 100%), 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
}
.galleryGrid.compact {
  grid-template-columns: repeat(auto-fit, minmax(min(8rem, 100%), 1fr));
}
.galleryGrid.expanded {
  grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
  /* grid-column-gap: 2rem;
  grid-row-gap: 2rem; */
}

.galleryGrid.list {
  grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
}

.gallerylistItem {
  height: 100%;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  box-shadow: 0 0 0 0rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-out;
  cursor: pointer;
}
.gallerylistItem:hover {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

/* .itemLink {
  display: block;
  width: 100%;
} */
.itemLink:hover {
  /* border: 1px solid white; */
}
.galleryListItemContent {
  display: flex;
  width: 100%;
}

#MomentsList .galleryGrid.compact .galleryImageWrap{
  
  flex-basis: 50%;
}
#MomentsList .galleryListItemContent{
  flex-direction: column;
}
#MomentsList .galleryListItemContent p{
  margin: 0;
  padding: 0;
}
.gallerylistItem label {
  font-size: 0.675rem;
  white-space: nowrap;
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  width: 100%;
  flex-basis: 1rem;
}
.fileType {
  font-size: 0.675rem;
  background: var(--ui-color, #111);
  color: var(--background-color, #111);
  padding: 0 0.25rem;
  margin-right: 0.25rem;
  border-radius: 4px;
  letter-spacing: unset;
  font-variation-settings: 'wght' 500;
}
.galleryImageWrap {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex-basis: 80%;
  flex-shrink: 0;
  flex-grow: 1;
  overflow: hidden;
}
.galleryImageWrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left top;
}

.itemDescription {
  font-size: 0.75rem;
  line-height: 1.5;
}

.itemTags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.pillWrap {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.pill {
  background: var(--ui-color, #111);
  color: var(--background-color, #eee);
  padding: 1px 0.5rem;
  border-radius: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 0.25rem 0.25rem;
  font-size: 0.75rem;
  box-shadow: 0 0 0 0 var(--ui-color, #111);
  cursor: pointer;
}
.pill span:first-child {
  margin-right: 1rem;
}
.pill:hover {
  box-shadow: 0 0 0 2px var(--ui-color, #111);
}

/** EXPANDED */
.expanded .gallerylistItem,
.list .gallerylistItem {
  flex-direction: row;
}
.expanded .gallerylistItem .galleryImageWrap,
.list .gallerylistItem .galleryImageWrap {
  flex-basis: 50%;
}
.compact .gallerylistItem .galleryListItemContent {
  padding-top: 0.25rem;
}
.expanded .gallerylistItem .galleryListItemContent,
.list .gallerylistItem .galleryListItemContent {
  flex-basis: 50%;
  height: 100%;
  padding: 0.25rem 0.25rem 0.5rem;
  flex-direction: column;
}
.expanded .gallerylistItem .fileType,
.list .gallerylistItem .fileType {
  display: block;
}
</style>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: ['displayMode', 'moments'],
  data() {
    return {
      // nothing to see here
    }
  },

  computed: {
    ...mapGetters({
      galleryContractId: 'galleryStore/galleryContractId',
      // moments: 'galleryStore/moments',
      // galleryFilter: 'galleryStore/galleryFilter',
    }),
  },

  methods: {
    ...mapMutations({
      filterGallery: 'galleryStore/filterGallery',
      // clearGalleryFilter: 'galleryStore/clearGalleryFilter',
    }),
    handleLink(item, contractId) {
      const tokenId = item.tokenId
      const tempItem = {
        imageUrlOriginal: item.imageUrlOriginal,
        imageUrlThumbnail: item.imageUrlThumbnail,
        imagePreviewUrl: item.imagePreviewUrl,
        title: item.name,
        description: item.description,
        tokenId,
        contractId,
      }
      // console.log('this.$store', this.$store)
      this.$store.commit('ui/setTempViewItem', tempItem)

      this.$router.push({
        // path: `/VIEW/${error}`,
        path: `/view/${contractId}/${tokenId}`,
        // query: { id: tokenId, contract: contractId },
      })
    },
    getFileType(traits) {
      // console.log('traits', traits)
      // console.log(
      //   'types: ',
      //   traits.filter((trait) => trait.trait_type)
      // )
      const filtered = traits.filter(
        (trait) => trait.trait_type === 'file type'
      )
      const fileTrait = filtered && filtered[0]
      // console.log('fileTrait', fileTrait)
      return fileTrait ? fileTrait.value : ''
    },
    getTrait(traits, traitName) {
      const filtered = traits.filter((trait) => trait.trait_type === traitName)
      const fileTrait = filtered && filtered[0]
      // console.log('fileTrait', fileTrait)
      return fileTrait ? fileTrait.value : undefined
    },

    filteredSets(assets) {
      const allSets = []
      assets.map((asset) => {
        const exhibition = this.getTrait(asset.traits, 'exhibition')

        if (!exhibition) {
          console.log('exhibition is null')
          return
        }
        const thisSet = allSets.filter((set) => set.name === exhibition)
        const thisSetIndex = allSets.findIndex((set) => set.name === exhibition)
        // console.log('thisSet', thisSet)
        // console.log('thisSetIndex', thisSetIndex)
        let newSet
        if (thisSetIndex > -1) {
          let currentSet = allSets[thisSetIndex]
          newSet = {
            ...currentSet,
            count: currentSet.count + 1,
          }

          allSets[thisSetIndex] = newSet
        } else {
          newSet = {
            name: exhibition,
            count: 1,
          }
          allSets.push(newSet)
        }
        return exhibition
      })

      return allSets.sort((a, b) => b.count - a.count)
    },
  },
}
</script>
