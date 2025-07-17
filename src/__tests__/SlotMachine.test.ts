import { SlotMachine } from '../slots/SlotMachine';

jest.mock('pixi.js', () => ({
    Container: jest.fn().mockImplementation(() => ({
        addChild: jest.fn(),
        removeChild: jest.fn(),
    })),
    Graphics: jest.fn().mockImplementation(() => ({
        beginFill: jest.fn(),
        drawRect: jest.fn(),
        endFill: jest.fn(),
    })),
    Sprite: jest.fn(),
    Application: jest.fn().mockImplementation(() => ({
        screen: { width: 800, height: 600 },
    })),
}));

jest.mock('../utils/sound', () => ({
    play: jest.fn(),
}));

jest.mock('../utils/AssetLoader', () => ({
    AssetLoader: {
        getTexture: jest.fn().mockReturnValue({}),
        getSpine: jest.fn().mockReturnValue({}),
    },
}));

jest.mock('pixi-spine', () => ({
    Spine: jest.fn().mockImplementation(() => ({
        state: {
            setAnimation: jest.fn(),
            addListener: jest.fn(),
            hasAnimation: jest.fn().mockReturnValue(true),
        },
        x: 0,
        y: 0,
        visible: true,
    })),
}));

describe('SlotMachine', () => {
    it('should initialize reels and background', () => {
        const app = new (require('pixi.js').Application)();
        const sm = new SlotMachine(app);
        expect(sm['reels'].length).toBeGreaterThan(0);
        expect(sm['container']).toBeDefined();
    });

    it('should call sound.play and set isSpinning on spin', () => {
        const app = new (require('pixi.js').Application)();
        const sm = new SlotMachine(app);
        sm['spinButton'] = { texture: {}, interactive: true } as any;
        sm.spin();
        const sound = require('../utils/sound');
        expect(sound.play).toHaveBeenCalled();
        expect(sm['isSpinning']).toBe(true);
    });

    it('should call sound.play and add spine on win', () => {
        const app = new (require('pixi.js').Application)();
        const sm = new SlotMachine(app);
        jest.spyOn(Math, 'random').mockReturnValue(0.1); // force win
        sm['container'].addChild = jest.fn();
        sm['container'].removeChild = jest.fn();
        sm['checkWin']();
        const sound = require('../utils/sound');
        expect(sound.play).toHaveBeenCalledWith('win');
        expect(sm['container'].addChild).toHaveBeenCalled();
        (Math.random as jest.MockedFunction<typeof Math.random>).mockRestore();
    });
}); 