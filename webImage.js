/**
 * Created by jie on 2018/3/15.
 * 说明： 本文件为nativeImage
 */
import EventTarget from './observer.js'

var webImage = new EventTarget();
var _onProgress = function(data){
    data.options.target.progress( data.params )
}
var _onComplete = function(data){
    data.options.target.complete( data.params )
}
webImage.addEvent("onProgress", _onProgress)
webImage.addEvent("onComplete", _onComplete)

export default webImage = webImage
