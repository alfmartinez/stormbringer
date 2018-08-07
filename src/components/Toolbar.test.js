import React from 'react';
import {shallow} from 'enzyme';
import {Toolbar} from "./Toolbar";
import {DataLoader} from "./DataLoader";
import {DownloadLink} from "./DownloadLink";
import {NewElementButton} from "./NewElementButton";

describe("Toolbar", () => {
    it("should render expect components", () => {
        const wrapper = shallow(<Toolbar/>);
        expect(wrapper.find(DataLoader).exists()).toBe(true);
        expect(wrapper.find(NewElementButton).exists()).toBe(true);
        expect(wrapper.find(DownloadLink).exists()).toBe(true);

    });
})