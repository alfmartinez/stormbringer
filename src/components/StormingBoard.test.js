import {shallow} from 'enzyme';
import StormingBoard from "./StormingBoard";
import React from "react";
import {Note} from "./Note";

describe('Stormingboard', () => {
    it('should render with no notes', () => {
        const elements = [];
        const wrapper = shallow(<StormingBoard elements={elements}/>);
        expect(wrapper.html()).toBe('<div class="StormingBoard"></div>');
    });

    it('should render with one note', () => {
        const noteProps = {id: 'evt_01'};
        const elements = [noteProps];
        const wrapper = shallow(<StormingBoard elements={elements}/>);
        expect(wrapper.find(Note)).toHaveLength(1);
        expect(wrapper.find(Note).props()).toEqual(noteProps);
    });

    it('should render with 2 notes', () => {
        const noteProps = {id: 'evt_01'};
        const otherProps = {id: 'evt_02'};
        const elements = [noteProps, otherProps];
        const wrapper = shallow(<StormingBoard elements={elements}/>);
        expect(wrapper.find(Note)).toHaveLength(2);
        expect(wrapper.find(Note).first().props()).toEqual(noteProps);
        expect(wrapper.find(Note).at(1).props()).toEqual(otherProps);
    });
})