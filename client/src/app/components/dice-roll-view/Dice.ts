export default class Dice {

    public die;
    public sides = 20;
    public initialSide = 1;
    public lastFace;
    public timeoutId;
    public transitionDuration = 500;
    public animationDuration = 1000;
    public isRolling = false;
    public dataFace;

    constructor(sides?: number) {
        if (sides) {
            this.sides = sides;
        }
    }

    public randomFace() {
        const face = Math.floor((Math.random() * this.sides)) + this.initialSide;
        this.lastFace = face == this.lastFace ? this.randomFace() : face;
        return face;
      }
      
      public rollTo(face) {
        console.log(face);
        clearTimeout(this.timeoutId);
        this.dataFace = face;
      }
      
      public reset() {
        this.dataFace = null;
        this.isRolling = false;
      }
      
      public rollToRandom() {
        this.isRolling = true;
        clearTimeout(this.timeoutId);
        const that = this;
        this.timeoutId = setTimeout(function () {
          that.isRolling = false;
    
          that.rollTo(that.randomFace())
        }, this.animationDuration);
        
        return false;
      }
    
}