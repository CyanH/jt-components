<template>
  <image-view :img-list="imgList" :base-api="baseApi" />
</template>

<script>
import imageView from './package/imageView/index'

export default {
  components: {
    imageView
  },
  data() {
    return {
      baseApi: 'http://14.23.111.138:92/jlmz',
      imgList: [
        '\\20221024-152910\\2ec8078484fced2ae3d14671d4befb3.jpg',
        '\\20221024-152915\\7655d7332f2d5212266e9b9f076d3a6.jpg',
        '\\20221024-152916\\6ad6c722c2b76cb05e343c76923249c.jpg'
      ]
    }
  }
}
</script>
