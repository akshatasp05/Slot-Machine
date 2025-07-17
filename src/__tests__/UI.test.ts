import { UI } from '../ui/UI';

jest.mock('pixi.js', () => ({
    Container: jest.fn().mockImplementation(() => ({
        addChild: jest.fn(),
    })),
    Sprite: jest.fn(),
    Text: jest.fn(),
    Graphics: jest.fn(),
}));

jest.mock('../utils/AssetLoader', () => ({
    AssetLoader: {
        getTexture: jest.fn().mockReturnValue({}),
    },
}));

describe('UI', () => {
    it('should initialize and create a container', () => {
        const mockApp = { stage: {}, renderer: {}, render: jest.fn(), view: {} };
        const mockSlotMachine = { container: {}, reels: [], app: mockApp, isSpinning: false };
        const ui = new UI(mockApp as any, mockSlotMachine as any);
        expect(ui['container']).toBeDefined();
    });

    // Add more tests for public methods if needed
}); 