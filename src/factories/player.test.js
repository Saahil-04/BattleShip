import Player from './player.js';

test('should make the player', () => {
    const player = Player('Player1');
    expect(player).toEqual({
        name: 'Player1',
        isAI: 'false',
        makeMove: expect.any(Function),
        randomMoves: expect.any(Function),
    })
})
