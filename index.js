class TwoDLanguage {
    constructor() {
      this.grid = [
        "23*5*5*2+,"
      ];
  
      this.ip = { x: 0, y: 0 }; // Instruction Pointer
      this.stack = [];
      this.ipold = { x: 0, y: 0 };
      this.direction = { dx: 1, dy: 0 }; // Initial direction (right)
    }
  
    getCurrentInstruction() {
      if (this.grid[this.ip.y]) {
        const char = this.grid[this.ip.y][this.ip.x % this.grid[this.ip.y].length];
        return char;
      }
      return undefined;
    }
  
    moveInstructionPointer(dx, dy) {
      const newX = this.ip.x + dx;
      const newY = this.ip.y + dy;
  
      if (this.grid[newY] && this.grid[newY][newX % this.grid[newY].length]) {
        this.ip = { x: newX, y: newY };
      }
    }
  
    pushToStack(value) {
      this.stack.push(value);
    }
  
    popFromStack() {
      return this.stack.pop();
    }
  
    executeInstruction(instruction) {
        console.log("[?] Instruction At X:", myLanguage.ip.x, "Y:", myLanguage.ip.y);
        console.log("[?] Current Instruction:", instruction);
      switch (instruction) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.pushToStack(parseInt(instruction));
          break;
  
        case '+':
          this.pushToStack(this.popFromStack() + this.popFromStack());
          break;
  
        case '-':
          const num2 = this.popFromStack();
          const num1 = this.popFromStack();
          this.pushToStack(num1 - num2);
          break;
  
        case '*':
          this.pushToStack(this.popFromStack() * this.popFromStack());
          break;
  
        case '/':
          const divisor = this.popFromStack();
          const dividend = this.popFromStack();
          this.pushToStack(dividend / divisor);
          break;
  
        case '%':
          const moduloDivisor = this.popFromStack();
          const moduloDividend = this.popFromStack();
          this.pushToStack(moduloDividend % moduloDivisor);
          break;
  
        case '!':
          this.pushToStack(this.popFromStack() === 0 ? 1 : 0);
          break;
  
        case '`':
          const greaterThanValue2 = this.popFromStack();
          const greaterThanValue1 = this.popFromStack();
          this.pushToStack(greaterThanValue1 > greaterThanValue2 ? 1 : 0);
          break;
  
        case '>':
          this.direction = { dx: 1, dy: 0 };
          break;
  
        case '<':
          this.direction = { dx: -1, dy: 0 };
          break;
  
        case '^':
          this.direction = { dx: 0, dy: -1 };
          break;
  
        case 'v':
          this.direction = { dx: 0, dy: 1 };
          break;
  
        case '?':
          const randomDirection = Math.floor(Math.random() * 4);
          switch (randomDirection) {
            case 0:
              this.direction = { dx: 1, dy: 0 };
              break;
            case 1:
              this.direction = { dx: -1, dy: 0 };
              break;
            case 2:
              this.direction = { dx: 0, dy: -1 };
              break;
            case 3:
              this.direction = { dx: 0, dy: 1 };
              break;
          }
          break;
  
        case '_':
          this.direction = { dx: this.popFromStack() === 0 ? 1 : -1, dy: 0 };
          break;
  
        case '|':
          this.direction = { dx: 0, dy: this.popFromStack() === 0 ? 1 : -1 };
          break;
  
        case '"':
          let stringMode = true;
          while (stringMode) {
            this.moveInstructionPointer(this.direction.dx, this.direction.dy);
            const char = this.getCurrentInstruction();
            if (char === '"') {
              stringMode = false;
            } else {
              this.pushToStack(char.charCodeAt(0));
            }
          }
          break;
  
        case ':':
          const topStackValue = this.popFromStack();
          this.pushToStack(topStackValue);
          this.pushToStack(topStackValue);
          break;
  
        case '\\':
          const swapValue2 = this.popFromStack();
          const swapValue1 = this.popFromStack();
          this.pushToStack(swapValue2);
          this.pushToStack(swapValue1);
          break;
  
        case '$':
          this.popFromStack();
          break;
  
        case '.':
          console.log("[PRG OUT]", this.popFromStack());
          break;
  
        case ',':
          console.log("[PRG OUT]", String.fromCharCode(this.popFromStack()));
          break;
  
        case '#':
          this.moveInstructionPointer(this.direction.dx, this.direction.dy);
          break;
  
        case 'p':
          const yCoord = this.popFromStack();
          const xCoord = this.popFromStack();
          const value = this.popFromStack();
          const row = this.grid[yCoord].split('');
          row[xCoord] = String.fromCharCode(value);
          this.grid[yCoord] = row.join('');
          break;
  
        case 'g':
          const getY = this.popFromStack();
          const getX = this.popFromStack();
          const charAtLocation = this.grid[getY][getX];
          this.pushToStack(charAtLocation.charCodeAt(0));
          break;
  
        case '&':
          // Implement input logic here
          break;
  
        case '~':
          // Implement input logic here
          break;
  
        case '@':
          // End program
          console.log("Program ended");
          break;
  
        default:
          // Assume it's a number, push to stack
          this.pushToStack(parseInt(instruction, 10));
      }
    }
  }
  
  const myLanguage = new TwoDLanguage();
  const maxLength = myLanguage.grid[0].length
  
  for (let i = 0; i < maxLength; i++) {
    const instruction = myLanguage.getCurrentInstruction();
    myLanguage.executeInstruction(instruction);
    myLanguage.moveInstructionPointer(myLanguage.direction.dx, myLanguage.direction.dy);
  }