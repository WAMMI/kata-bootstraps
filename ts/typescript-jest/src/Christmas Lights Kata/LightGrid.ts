export class LightGrid {

    private readonly grid: number[][];
    constructor(width: number, height: number) {
        if (width <= 0 || height <= 0) {
            throw new Error("Invalid grid size");
        }
        this.grid = Array.from({length: width}, () => Array(height).fill(0));
    }

    size(): number{
        return this.grid.length * this.grid[0].length;
    }

    getTotalLightValue(): number {
        let accumulatedLightValue = 0;
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[0].length; y++) {
                accumulatedLightValue += this.grid[x][y];
            }
        }
        return accumulatedLightValue;
    }

    getLightsOff(): number {
        return this.size() - this.getTotalLightValue();
    }

    getLightValue(x: number, y: number): number {
        if (!this.validatePoint(x, y)) {
            throw new Error("Invalid light position");
        }
        return this.grid[x][y];
    }

    setLightValue(x: number, y: number, value: number): void {
        if (!this.validatePoint(x, y)) {
            throw new Error("Invalid light position");
        }
        this.grid[x][y] = value;
    }

    private validatePoint(x: number, y: number): boolean {
        return !(x < 0 || y < 0 || x >= this.grid.length || y >= this.grid[0].length);
    }

    increase(x: number, y: number, increaseValue: number): void {
        if (!this.validatePoint(x, y)) {
            throw new Error("Invalid light position");
        }

        this.setLightValue(x, y, this.getLightValue(x, y) + increaseValue);
    }

    decrease(x: number, y: number, decreaseValue: number): void {
        if (!this.validatePoint(x, y)) {
            throw new Error("Invalid light position");
        }
        this.setLightValue(x, y, this.getLightValue(x, y) - decreaseValue);
        if (this.getLightValue(x, y) < 0) {
            this.setLightValue(x, y, 0);
        }
    }

    increaseInRange(x1: number, y1: number, x2: number, y2: number, increaseValue: number): void {
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                this.increase(x, y, increaseValue);
            }
        }
    }

    decreaseInRange(x1: number, y1: number, x2: number, y2: number, decreaseValue: number): void {
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                this.decrease(x, y, decreaseValue);
            }
        }
    }
}
