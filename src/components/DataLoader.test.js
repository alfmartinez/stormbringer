import React from "react";
import {shallow as render} from 'enzyme';
import {DataLoader} from "./DataLoader";

describe("DataLoader", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = render(<DataLoader/>)
    })

    it("should render as file input field", () => {
        expect(wrapper.type()).toBe('input');
        expect(wrapper.prop('type')).toBe('file');
        expect(wrapper.prop('id')).toBe('file-input');
    });

    it("should publish json content of file", (done) => {
        const expectedContent = ["toto"];

        var token = PubSub.subscribe('Storm.Load', (msg,data) => {
            expect(data).toEqual(expectedContent);
            done();
        })
        const content = JSON.stringify(expectedContent);
        const blob = new Blob([content],{
            type: 'application/json'
        })
        wrapper.simulate('change', {
            target: {
                files: [blob]
            }
        });
    })

    it("should do nothing if no file", () => {
        var token = PubSub.subscribe('Storm.Load', (msg,data) => {
            throw 'Should Not Be Called';
        });

        wrapper.simulate('change', {
            target: {
                files: []
            }
        });

    })
});