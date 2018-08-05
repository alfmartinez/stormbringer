import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import {Note} from "./Note";
import Draggable from "react-draggable";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Note/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders as a draggable', () => {
    const wrapper = shallow(<Note />);
    expect(wrapper.name()).toBe('Draggable');
});

it('renders at expected location', () => {
    const position = {x: 34, y: 2};
    const wrapper = shallow(<Note position={position}/>);
    expect(wrapper.find(Draggable).prop('defaultPosition')).toBe(position);
});

it('renders expected note', () => {
    const position = {x: 34, y: 2};
    const id = "test_xyz";
    const title = "My Title";
    const wrapper = shallow(<Note position={position} id={id} title={title} type="event"/>);

    const noteDiv = wrapper.find('div');
    expect(noteDiv.prop('id')).toBe(id);
    expect(noteDiv.prop('title')).toBe(title);
    expect(noteDiv.prop('className')).toBe('event note');

    const labelSpan = noteDiv.find('span');
    expect(labelSpan.prop('className')).toBe('label');
    expect(labelSpan.contains(title)).toBe(true);

});