import React from "react";
import {shallow} from 'enzyme';
import {ElementForm} from "./ElementForm";

describe('ElementForm', () => {
    it('should render as hidden',()=>{
        const wrapper = shallow(<ElementForm show={false}/>);
        expect(wrapper.html()).toBe(null);
    });

    it('should render as shown',()=>{
        const wrapper = shallow(<ElementForm show={true}/>);
        const titleInput = wrapper.find('input[name="title"]');
        const typeInput = wrapper.find('select[name="type"]');
        const submitButton = wrapper.find('input[type="submit"]');
        expect(titleInput.exists()).toBe(true);
        expect(typeInput.exists()).toBe(true);
        expect(submitButton.exists()).toBe(true);
    });
})