class GameObject {
    constructor(x, y, symbol, collision) {
      this.x = x;
      this.y = y;
      this.symbol = symbol;
      this.collision = collision;
      this.id = -1;
      this.ltInit = false;
    }
  
    update() {
    }
  
    render() {
        Render.renderSymbol(this.x, this.y, this.symbol); 
    }
  }