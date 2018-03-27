/**
 * Created by jie on 2018/3/26.
 */

//�Զ����¼����캯��
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
        //�ж��Ƿ���ڸ��¼�����
        if( this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for(var i=0; i<handlers.length; i++){
                //ִ�д���
                handlers[i](event);
            }
        }
    },
    removeEvent: function (type, handler) {
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i = 0; i < handlers.length; i++){
                //�ҳ�������Ҫ������¼��±�
                if(handlers[i] == handler){
                  break;
                }
            }
            handlers.splice(i, 1);
        }
    }
}

export default EventTarget = EventTarget

