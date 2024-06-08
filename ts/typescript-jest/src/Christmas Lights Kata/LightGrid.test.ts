import {LightGrid} from "./LightGrid";

describe('Grid Creation', () => {
    it(`size is 1000000 for 1000x1000 grid`, () => {
        // Arrange
        const grid = new LightGrid(1000, 1000);

        // Act
        const size = grid.size();

        // Assert
        expect(size).toBe(1000000);
    });
    it(`can't have negative width or height`, () => {
        const createGrid = () => new LightGrid(-1, -1);
        expect(createGrid).toThrowError("Invalid grid size");
        const createGrid2 = () => new LightGrid(0, -1);
        expect(createGrid2).toThrowError("Invalid grid size");
        const createGrid3 = () => new LightGrid(-1, 0);
        expect(createGrid3).toThrowError("Invalid grid size");
    });
    it(`has zero lights turned on, initially`, () => {
        const grid = new LightGrid(10, 10);
        let lightsOff = 0;
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (grid.getLightValue(x, y) === 0) {
                    lightsOff++;
                }
            }
        }
        expect(lightsOff).toBe(100);
    });
});

describe('Light Manipulation', () => {
    it(`can increase and decrease light value`, () => {
        const grid = new LightGrid(10, 10);
        grid.increase(5, 5, 1);
        expect(grid.getLightValue(5, 5)).toBe(1);
        grid.decrease(5, 5, 1);
        expect(grid.getLightValue(5, 5)).toBe(0);
        grid.increase(5, 5, 1);
        expect(grid.getLightValue(5, 5)).toBe(1);
    });
    it(`can increase all lights between coordinate pairs`, () => {
        const grid = new LightGrid(100, 100);
        grid.increaseInRange(0, 0, 50, 50, 1);
        for (let x = 0; x < 51; x++) {
            for (let y = 0; y < 51; y++) {
                expect(grid.getLightValue(x, y)).toBe(1);
            }
        }
        for (let x = 51; x < 100; x++) {
            for (let y = 51; y < 100; y++) {
                expect(grid.getLightValue(x, y)).toBe(0);
            }
        }
    });
    it(`can decrease lights between coordinate pairs`, () => {
        const grid = new LightGrid(100, 100);
        grid.increaseInRange(0, 0, 99, 99, 1);
        grid.decreaseInRange(0, 0, 50, 50, 1);
        for (let x = 0; x < 51; x++) {
            for (let y = 0; y < 51; y++) {
                expect(grid.getLightValue(x, y)).toBe(0);
            }
        }
        for (let x = 51; x < 100; x++) {
            for (let y = 51; y < 100; y++) {
                expect(grid.getLightValue(x, y)).toBe(1);
            }
        }
    });
    it(`can't increase or decrease lights outside of grid`, () => {
        const grid = new LightGrid(10, 10);
        const increase = () => grid.increase(10, 10, 1);
        expect(increase).toThrowError("Invalid light position");
        const decrease = () => grid.decrease(10, 10, 1);
        expect(decrease).toThrowError("Invalid light position");
        const increaseInRange = () => grid.increaseInRange(10, 10, 10, 10, 1);
        expect(increaseInRange).toThrowError("Invalid light position");
        const decreaseInRange = () => grid.decreaseInRange(10, 10, 10, 10, 1);
        expect(decreaseInRange).toThrowError("Invalid light position");
    });
    it(`increases the correct amount of lights`, () => {
        const grid = new LightGrid(1000, 1000);
        grid.increaseInRange(0, 0, 0, 0, 1);
        expect(grid.getTotalLightValue()).toBe(1);
        const grid2 = new LightGrid(1000, 1000);
        grid2.increaseInRange(0, 0, 999, 999, 2);
        expect(grid2.getTotalLightValue()).toBe(2000000);
    });

    it(`can run santa's instructions`, () => {
        const grid = new LightGrid(1000, 1000);

        grid.increaseInRange(887, 9, 959, 629, 1);
        grid.increaseInRange(454, 398, 844, 448, 1);
        grid.decreaseInRange(539, 243, 559, 965, 1);
        grid.decreaseInRange(370, 819, 676, 868, 1);
        grid.decreaseInRange(145, 40, 370, 997, 1);
        grid.decreaseInRange(301, 3, 808, 453, 1);
        grid.increaseInRange(351, 678, 951, 908, 1);
        grid.increaseInRange(720, 196, 897, 994, 2);
        grid.increaseInRange(831, 394, 904, 860, 2);
        console.log(grid.getTotalLightValue());
        for (let x = 0; x < 1000; x++) {
            let row = "";
            for (let y = 0; y < 1000; y++) {
                row += grid.getLightValue(x, y);
            }
            console.log(row);
        }

    });

});
