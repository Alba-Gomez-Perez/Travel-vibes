import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill fetch
if (!global.fetch) {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        })
    );
}
