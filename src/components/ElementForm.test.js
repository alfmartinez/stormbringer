import React from "react";
import {shallow} from 'enzyme';
import {ElementForm} from "./ElementForm";

describe('ElementForm', () => {
    it('should render',()=>{
        const wrapper = shallow(<ElementForm />);
        const titleInput = wrapper.find('input[name="title"]');
        const typeInput = wrapper.find('select[name="type"]');
        const submitButton = wrapper.find('input[type="submit"]');
        expect(titleInput.exists()).toBe(true);
        expect(typeInput.exists()).toBe(true);
        expect(submitButton.exists()).toBe(true);
    });
})