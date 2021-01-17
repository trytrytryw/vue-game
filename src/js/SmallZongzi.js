import Hilo from "hilojs";
let SmallZongzi = Hilo.Class.create({
    Extends: Hilo.Bitmap,
    constructor: function (properties) {
      SmallZongzi.superclass.constructor.call(this, properties);
      this.onUpdate = this.onUpdate.bind(this);
    },
    over(){
      this.removeFromParent();
    },
    onUpdate() {
      if (this.parent.height < this.y) {
        this.removeFromParent();
        return
      }
    }
  })
   
  export default SmallZongzi