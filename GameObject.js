class GameObject {
    constructor(x, y, symbol, collision) {
      this.x = x;
      this.y = y;
      this.symbol = symbol;
      this.collision = collision;
    }
  
    update() {
    }
  
    render() {
        Game.renderSymbol(this.x, this.y, this.symbol); 
    }
  }