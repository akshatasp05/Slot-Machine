import { AssetLoader } from '../utils/AssetLoader';

jest.mock('pixi.js', () => ({
    Assets: {
        init: jest.fn(),
        addBundle: jest.fn(),
        loadBundle: jest.fn().mockResolvedValue({}),
    },
    Texture: jest.fn(),
}));

jest.mock('../utils/sound', () => ({
    add: jest.fn(),
}));

describe('AssetLoader', () => {
    it('should initialize PIXI.Assets in constructor', () => {
        const { Assets } = require('pixi.js');
        new AssetLoader();
        expect(Assets.init).toHaveBeenCalled();
    });

    it('should call PIXI.Assets.addBundle and loadBundle in loadAssets', async () => {
        const { Assets } = require('pixi.js');
        const loader = new AssetLoader();
        await loader.loadAssets();
        expect(Assets.addBundle).toHaveBeenCalled();
        expect(Assets.loadBundle).toHaveBeenCalled();
    });

    it('should return undefined for missing texture or spine', () => {
        expect(AssetLoader.getTexture('notfound')).toBeUndefined();
        expect(AssetLoader.getSpine('notfound')).toBeUndefined();
    });
}); 