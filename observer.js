/**
 * Created by jie on 2018/3/26.
 */

//自定义事件构造函数
function EventTarget(){
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    addEvent: function (type, handler) {
        if (typeof this.handlers[type] == 'undefined'){
            this.handlers[type] = [];
            this.handlers[type].push(handler);
        }
    },
    fireEvent: function (event) {
        if(!event.target){
            event.target = this;
        }
        //判断是否存在该事件类型
        if( this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for(var i=0; i<handlers.length; i++){
                //执行触发
                handlers[i](event);
            }
        }
    },
    removeEvent: function (type, handler) {
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i = 0; i < handlers.length; i++){
                //找出本次需要处理的事件下标
                if(handlers[i] == handler){
                  break;
                }
            }
            handlers.splice(i, 1);
        }
    }
}

export default EventTarget = EventTarget

