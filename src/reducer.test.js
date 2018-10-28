import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('reducer', () => {
    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeGreaterThan(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
    });
    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, { type: '__UNKNOWN' });
        expect(state).toBe(currentState);
    });

    describe('generateAuralUpdate', () => {
        it('Should generate an aural update', () => {
            let state = {
                guesses: [2, 39, 46],
                feedback: 'Test Feedback.',
                auralStatus: '',
                correctAnswer: 100
            };

            state = reducer(state, generateAuralUpdate());
            const expectedAuralStatus = 'Here\'s the status of the game right now: Test Feedback. You\'ve made 3 guesses. In order of most- to least-recent, they are: 46, 39, 2';
            expect(state.auralStatus).toEqual(expectedAuralStatus);
        });
    });

    describe('restartGame', () => {
        it('Should restart the game', () => {
            let state = {
                guesses: [2, 39, 46],
                feedback: 'Test Feedback.',
                auralStatus: 'some status',
                correctAnswer: -1
            };
            const correctAnswer = 4;
            state = reducer(state, restartGame(correctAnswer));
            const expectedState = {
                guesses: [],
                feedback: 'Make your guess!',
                auralStatus: '',
                correctAnswer: correctAnswer
            };
            expect(state).toEqual(expectedState);
        });
    });

    describe('makeGuess', () => {
        it('Should process a guess', () => {
            let state = {
                guesses: [2, 39, 46],
                feedback: 'Test Feedback.',
                auralStatus: '',
                correctAnswer: 100
            };
            state = reducer(state, makeGuess(99));
            const expectedState = {
                guesses: [2, 39, 46, 99],
                feedback: 'You\'re Hot!',
                auralStatus: '',
                correctAnswer: 100
            };
            expect(state).toEqual(expectedState);
        });
    });
});