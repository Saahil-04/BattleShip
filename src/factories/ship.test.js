import Ship from './ship.js';

test('should make the ship', () => {
    const ship = Ship(3);
    expect(ship).toEqual({
        length: 3,
        isSunk: expect.any(Function),
        hit: expect.any(Function),
        getHits: expect.any(Function),
    })
})

test('should hit the ship', () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.getHits()).toBe(1);
})

test("should sink the ship", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})
