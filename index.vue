
<template>
    <span>
        <span @click="popupImage" v-if="popupBtn">
            <slot name="popBtn">
                <img src="./icon-image.png" class="pop-btn">
            </slot>
        </span>
        <div ref="mImgNode" class="image-container" :style="containerStyle">
            <a v-for="(item,index) in images" :key="index" class="image-item" :style="itemStyle(index)">
                <img :src="item[`${murlKey()}`]" class="image" @click="viewFullImage(index)">
                <img v-if="removeIcon" src="./icon-delete.png" class="delete-icon" @click="removeImage(index)">
            </a>
        </div>

        <previewer :list="previewerImages" ref="previewer" ></previewer>

    </span>
</template>

<script type="text/ecmascript-6">
    const prefixList = ['-moz-box-', '-webkit-box-', '']
    import nativeImage from './nativeImage.js'
    import webImage from './webImage.js'
    import Previewer from 'vux/src/components/previewer/index.vue'

    export default {
        props: {
          cols: {
            type: Number,
            default: 3
          },
          gutter: {
            type: Number,
            default: 8
          },
          maxCount: {
              type: Number,
              default: 9
          },
          origin: {
              type: Array,
              validator: function (value) {
                let size = value.length
                let error_size = value.filter((item,index) => !item.image_crop_url).length
                if (error_size > 0){
                    return false
                }
                return true
              },
              default: []
          },
          murl:  {
              type: String,
              default: 'image_crop_url'
          },
          url: {
              type: String,
              required: true
          },
          popupBtn: {
              type: Boolean,
              default: true
          },
          removeIcon: {
              type: Boolean,
              default: true
          }
        },

        components: {
            Previewer
        },

        data(){
            return{
                images: [
                    /*{

                    }*/
                ],
                native_image: {},

                options: {
                    getThumbBoundsFn (index) {
                      // find thumbnail element
                      let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                      // get window scroll Y
                      let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                      // optionally get horizontal scroll
                      // get position of element relative to viewport
                      let rect = thumbnail.getBoundingClientRect()
                      // w = width
                      return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                      // Good guide on how to get element coordinates:
                      // http://javascript.info/tutorial/coordinates
                    }
                }
            }
        },

        methods: {
            itemWidth(){
                let rootWidth = this.$refs.mImgNode.offsetWidth
                let width = rootWidth - this.gutter * (this.cols - 1)
                return `${width/this.cols}px`
            },

            itemStyle(index){
                const styles = {
                    'position': 'relative',
                    'float': 'left',
                    'padding-top': `${this.gutter/2}px`,
                    'width': this.itemWidth()
                }
                for (let i = 0; i < prefixList.length; i++) {
                  styles[`${prefixList[i]}box-sizing`] = 'border-box'
                }
                let col_seq = index%this.cols
                if (col_seq != 0){
                  styles['margin-left'] = `${this.gutter}px`
                }
                return styles
            },

            popupImage(){
                this.native_image.init()
            },

            init(){
                if (this.origin.length > 0){
                    this.fillImages(this.origin)
                }
                this.native_image = new nativeImage({
                    webImage: webImage,
                    target: this,
                    settings: {
                      maxCount: isNaN(this.maxCount) ? '9' : this.maxCount.toString()
                    }
                })
            },

            getImagesSize(){
                return this.images.length
            },

            //填充 images 数组
            fillImages(images){
                this.images = images
                this.change()
            },

            addImage(image){
                this.images.push(image)
                this.change()
            },

            removeImage(index){
                let size = this.getImagesSize()
                if(!isNaN(index) && index>=0 && index<size){
                    this.images.splice(index,1);
                    this.$emit('on-remove',index);
                    this.change()
                    return index
                }
            },

            // 每上传成功一张图片，就被触发一次
            progress(data){
                if ( typeof(data) == 'object' ){
                    let imageObj = data
                    this.addImage( imageObj )
                }else{
                    throw error('图片对象格式错误')
                }
                this.$emit('on-progress',data);
            },

            complete(data){
                this.$emit('on-complete',data);
            },

            change(){
                let data = this.images
                this.$emit('on-change',data);
            },

            // 预览大图
            viewFullImage(index){
                this.$refs.previewer.show(index)
            },

            urlKey(){
                return this.url
            },

            murlKey(){
                if (this.getImagesSize()>0 ){
                    if (this.images[0][this.murl]){
                        return this.murl
                    }
                }
                return this.urlKey()
            }

        },

        created() {
            window._MImg = this
        },

        mounted(){
          this.init()
        },

        computed: {
            containerStyle(){
                let res = {}
                return res
            },

            previewerImages(){
                let res = []
                for(let i=0; i<this.getImagesSize(); i++){
                    let obj = {}
                    obj['src'] = this.images[i][this.urlKey()]
                    res.push( obj )
                }
                return res
            }
        }
    }

</script>

<style scoped lang="less">
    .pop-btn{
        width: 30px;
        height: 30px;
    }

    .image-container{
        width: 100%;
        padding: 0px;
        clear: both;
    }

    .image-item{
        position: relative;
        float: left;
    }

    .image{
        width: 100%;
    }

    .delete-icon{
        position: absolute;
        right: -5px;
        top: 0;
        width: 24px;
        height: 24px;
        padding: 10px 10px;
    }

</style>
