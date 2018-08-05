import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import {Note} from "./Note";
import Draggable from "react-draggable";
import * as PubSub from "pubsub-js";

describe('Note', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Note/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders as a draggable', () => {
        const wrapper = shallow(<Note/>);
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

    it('renders expected large note', () => {
        const wrapper = shallow(<Note type="aggregate"/>);

        const noteDiv = wrapper.find('div');
        expect(noteDiv.prop('className')).toBe('aggregate large-note');
    });

});

describe('Note events', () => {
    let published;
    let actualData;
    let publishedMessage;
    let token;

    const position = {x: 34, y: 2};
    const id = "test_xyz";
    const title = "My Title";
    const type = "event";
    const wrapper = shallow(<Note position={position} id={id} title={title} type="event"/>);

    beforeEach(() => {
        published = false;
        actualData = null;
        publishedMessage = null;

        token = PubSub.subscribe('Storm', (msg, data) => {
            published = true;
            publishedMessage = msg;
            actualData = data;
        });
    });

    afterEach(() => {
        PubSub.unsubscribe(token);
    });

    it('publishes edit message on double click',() => {
        wrapper.find('span').simulate('doubleclick');
        expect(published).toBe(true);
        expect(actualData).toEqual({id,position,title,type});
        expect(publishedMessage).toBe('Storm.Form.Load');
        PubSub.unsubscribe(token);
    });

    it('publishes move message on drag stop',() => {
        const newPosition = {x: 102,y: 43};
        wrapper.simulate('stop',newPosition);
        expect(published).toBe(true);
        expect(actualData).toEqual({id,position: newPosition});
        expect(publishedMessage).toBe('Storm.Element.Move');
        PubSub.unsubscribe(token);
    });
});
