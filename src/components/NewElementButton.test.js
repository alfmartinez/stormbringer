import React from "react";
import {shallow} from 'enzyme';
import {NewElementButton} from "./NewElementButton";

describe("NewElementButton", () => {
    it('should publish on click', (done) => {
        const wrapper = shallow(<NewElementButton/>);
        const token = PubSub.subscribe('Storm', (msg) => {
            expect(msg).toBe('Storm.Form.New');
            done();
        })
        wrapper.find('button').simulate('click');
    })
})