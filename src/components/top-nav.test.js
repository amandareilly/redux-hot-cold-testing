import React from 'react';
import {shallow} from 'enzyme';
import {generateAuralUpdate, RESTART_GAME} from '../actions';

import {TopNav} from './top-nav';

describe('<TopNav />', () => {
    it('Renders without crashing', () => {
        shallow(<TopNav />);
    });
    it('Dispatches restartGame when link is clicked', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TopNav dispatch={dispatch} />);
        const link = wrapper.find('.new');
        link.simulate('click');
        expect(dispatch.mock.calls[0][0].type).toEqual(RESTART_GAME);
    });
    it('Dispatches generateAuralUpdate when link is clicked', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TopNav dispatch={dispatch} />);
        const link = wrapper.find('.status-link');
        link.simulate('click');
        expect(dispatch).toHaveBeenCalledWith(generateAuralUpdate());
    });
});