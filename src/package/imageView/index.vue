<template>
  <div style="display: flex; width: 100%; flex-wrap: wrap">
    <div v-for="(item, index) in pictrueList" :key="index" class="imgCard">
      <el-image
        v-if="item.type === 'image'"
        class="img"
        :src="item.url"
        lazy
        fit="fill"
      />
      <img
        v-else-if="item.type === 'other'"
        class="img"
        src="@/assets/other.svg"
      >
      <img v-else class="img" :src="svgList[item.type]">

      <div class="preDel">
        <i
          v-if="item.type == 'image'"
          class="el-icon-zoom-in"
          @click="handlePreview(index)"
        />
        <i
          class="el-icon-download"
          style="margin-left: 5px"
          @click="handleDownload(item)"
        />
      </div>
    </div>

    <el-image-viewer
      v-if="showImage"
      :url-list="previewList"
      :initial-index="chooseIndex"
      :on-close="handleClose"
      z-index="8888"
    />
  </div>
</template>

<script>
import ElImageViewer from 'jintu-ui/packages/image/src/image-viewer'
export default {
  name: 'ImageView',
  components: {
    ElImageViewer
  },
  props: {
    baseApi: {
      type: String,
      default: '',
      require: true
    }

  },
  data() {
    return {
      svgList: {
        pdf: require('@/assets/pdf.svg'),
        ppt: require('@/assets/ppt.svg'),
        pptx: require('@/assets/ppt.svg'),
        txt: require('@/assets/txt.svg'),
        xlsx: require('@/assets/xls.svg'),
        xls: require('@/assets/xls.svg'),
        docx: require('@/assets/doc.svg'),
        doc: require('@/assets/doc.svg')
      },
      pictrueList: [],
      previewList: [],
      showImage: false,
      chooseIndex: 0
    }
  },

  methods: {
    setImageList(imgList) {
      this.pictrueList = imgList.map((item) => {
        const obj = {}
        obj.url = this.baseApi + '/file' + item
        obj.address = item
        obj.name = item.substr(item.lastIndexOf('\\') + 1)
        if (
          item.lastIndexOf('.bmp') !== -1 ||
        item.lastIndexOf('.jpg') !== -1 ||
        item.lastIndexOf('.jpeg') !== -1 ||
        item.lastIndexOf('.png') !== -1 ||
        item.lastIndexOf('.gif') !== -1 ||
        item.lastIndexOf('.webp') !== -1
        ) {
          obj.type = 'image'
        } else if (
          item.lastIndexOf('.docx') === -1 &&
        item.lastIndexOf('.doc') === -1 &&
        item.lastIndexOf('.xlsx') === -1 &&
        item.lastIndexOf('.ppt') === -1 &&
        item.lastIndexOf('.pptx') === -1 &&
        item.lastIndexOf('.xls') === -1 &&
        item.lastIndexOf('.pdf') === -1 &&
        item.lastIndexOf('.txt') === -1
        ) {
          obj.type = 'other'
        } else {
          obj.type = item.slice(item.lastIndexOf('.') + 1, item.length)
        }

        this.previewList.push(obj.url)
        return obj
      })
    },

    handleDownload(file) {
      // downloadFile
      console.log(file, 'file')
      try {
        const address = file.url
        console.log(address, 'addresss')
        if (address.endsWith('pdf')) {
          this.downloadPDF(address, file.name)
          var tempLink = document.createElement('a')
          tempLink.style.display = 'none'
          tempLink.href = address
          tempLink.setAttribute('download', file.name)
          tempLink.setAttribute('target', '_blank')
          document.body.appendChild(tempLink)
          tempLink.click()
          document.body.removeChild(tempLink)
        } else if (address.endsWith('pptx')) {
          window.open(address, '_blank')
        } else if (address.endsWith('xlsx')) {
          window.open(address, '_blank')
        } else if (address.endsWith('xls')) {
          window.open(address, '_blank')
        } else if (address.endsWith('doc')) {
          window.open(address, '_blank')
        } else if (address.endsWith('docx')) {
          window.open(address, '_blank')
        } else {
          const name = address.substr(address.lastIndexOf('/') + 1)
          this.downloadIamge(address, name)
        }
      } catch (err) {
        // console.log(err);
        this.$message({
          type: 'error',
          message: '图片下载失败'
        })
      }
    },
    downloadIamge(imgsrc, name) {
      const image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function() {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
        const a = document.createElement('a') // 生成一个a元素
        const event = new MouseEvent('click') // 创建一个单击事件
        a.download = name || 'photo' // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc
    },
    handlePreview(index) {
      this.showImage = true
      this.chooseIndex = index
    },
    handleClose() {
      this.showImage = false
    }
  }
}
</script>

<style lang="scss" scoped>
.imgCard {
  margin: 0 10px 15px 10px;
  position: relative;
  text-align: center;
  width: 120px;
}

.preDel {
  height: 120px;
  width: 120px;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  opacity: 0;
  text-align: center;
  line-height: 120px;
  cursor: default;
  color: #fff;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
  }

  i {
    cursor: pointer;
  }
}

.img {
  width: 120px;
  height: 120px;
}
</style>
