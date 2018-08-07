import React from "react";
import {shallow as render} from 'enzyme';
import {DownloadLink} from "./DownloadLink";
import * as PubSub from "pubsub-js";

describe("DownloadLink", () => {
    function expectDatalinkHasContent(href, expectedContent) {
        const parts = href.split(',');
        expect(parts[0]).toBe('data:application/octet-stream;charset=utf-16le;base64');
        const contents = JSON.parse(atob(parts[1]));
        expect(contents).toEqual(expectedContent);
    }

    let wrapper;

    beforeEach(() => {
        wrapper = render(<DownloadLink/>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("initially allows download of empty elements list as json file", () => {
        const expectedContent = [];

        const href = wrapper.prop('href');
        expectDatalinkHasContent(href, expectedContent);
    });

    it("allows download of saved element list as json file", () => {
        const expectedContent = ["toto"];

        PubSub.publishSync('Storm.Save', expectedContent);
        wrapper.update();

        const href = wrapper.prop('href');
        expectDatalinkHasContent(href, expectedContent);
    });

    it("ignores other events", () => {
        const expectedContent = [];

        PubSub.publishSync('Storm.Save.Other', ["toto"]);
        wrapper.update();

        const href = wrapper.prop('href');
        expectDatalinkHasContent(href, expectedContent);
    });

});