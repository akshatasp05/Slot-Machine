import { Reel } from '../slots/Reel';

jest.mock('pixi.js', () => ({
    Container: jest.fn().mockImplementation(() => ({
        addChild: jest.fn(),
    })),
    Sprite: jest.fn().mockImplementation(() => ({
        x: 0,
        y: 0,
    })),
}));

jest.mock('../utils/AssetLoader', () => ({
    AssetLoader: {
        getTexture: jest.fn().mockReturnValue({}),
    },
}));

describe('Reel', () => {
    it('should create the correct number of symbols', () => {
        const reel = new Reel(3, 100);
        expect(reel['symbols'].length).toBe(3);
    });

    it('should start and stop spinning', () => {
        const reel = new Reel(2, 50);
        reel.startSpin();
        expect(reel['isSpinning']).toBe(true);
        expect(reel['speed']).toBeGreaterThan(0);
        reel.stopSpin();
        expect(reel['isSpinning']).toBe(false);
    });

    it('should update symbol positions when spinning', () => {
        const reel = new Reel(2, 50);
        reel.startSpin();
        const initialX = reel['symbols'][0].x;
        reel.update(1);
        expect(reel['symbols'][0].x).not.toBe(initialX);
    });
}); 