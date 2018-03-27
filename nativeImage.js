/**
 * Created by jie on 2018/3/14.
 */

function nativeImage (opt){
    var _self = this;
    this.options  = opt || {}
    this.init = function () {
        window._win_nativeImage = _self;
        //todo  这里添加代码，调用native拉起图片选择器
        callNativeImageFuc(this.options);
    },
    /*
    native在拿到图片对象后，调用 _win_nativeImage.progress()方法,参数传序列化的json对象
    */
    this.progress = function (data) {
        var imageObj = {}
        if (data){
            try {
                if (typeof data == 'string'){
                  imageObj = JSON.parse(data)
                }else if(typeof data == 'object'){
                  imageObj = data
                }
                _self.options.webImage.fireEvent({
                    type: "onProgress",
                    params: imageObj,
                    options: _self.options
                })
            }catch(e){
                alert(e)
            }
        }
    },
    /*
    native在所有图片处理完之后，调用 _win_nativeImage.complete()方法,参数传序列化的json对象例如："{"flag":true}"
    */
    this.complete = function (data) {
        var flagObj = {}
        if (data){
            try {
                if (typeof data == 'string'){
                   flagObj = JSON.parse(data)
                }else if(typeof data == 'object'){
                   flagObj = data
                }
                _self.options.webImage.fireEvent({
                    type: "onComplete",
                    params: flagObj,
                    options: _self.options
                })
            }catch(e){
                alert(e)
            }
        }
    }
}

export default nativeImage = nativeImage

