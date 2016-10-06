/* global describe, it, expect */
import MockDate from 'mockdate';
import { getDurationString } from './date';

describe('getDurationString', () => {
  describe('formats', () => {
    it('are supplied as an array', () => {
      expect(getDurationString.formats).toBeInstanceOf(Array);
      expect(getDurationString.formats.length).toMatchSnapshot();
    });
  });

  it('defaults to full dates', () => {
    expect(getDurationString("2016-10-05T03:39:57.000Z", "2016-10-05T03:40:02.000Z")).toMatchSnapshot();
  });

  getDurationString.formats.map((format) => {
    it(`correctly handles \`${format}\` dates`, () => {
      expect(getDurationString("2016-05-07T09:00:00.000Z", "2016-05-07T09:00:00.000Z", format)).toMatchSnapshot();
      expect(getDurationString("2016-05-07T09:00:00.000Z", "2016-05-07T09:00:05.000Z", format)).toMatchSnapshot();
      expect(getDurationString("2016-05-07T09:00:00.000Z", "2016-05-07T09:15:07.000Z", format)).toMatchSnapshot();
      expect(getDurationString("2016-05-07T09:00:00.000Z", "2016-05-07T10:45:16.000Z", format)).toMatchSnapshot();
      expect(getDurationString("2016-05-07T09:00:00.000Z", "2016-05-07T13:59:03.000Z", format)).toMatchSnapshot();
      expect(getDurationString("2016-05-07T09:00:00.000Z", "2016-05-08T16:03:21.000Z", format)).toMatchSnapshot();
      expect(getDurationString("2016-05-07T09:00:00.000Z", "2016-05-21T01:22:12.000Z", format)).toMatchSnapshot();
      expect(getDurationString("2016-05-07T09:00:00.000Z", "2016-07-10T04:34:17.000Z", format)).toMatchSnapshot();
    });
  });

  it('falls back to `now` when not supplied a `to` value', () => {
    MockDate.set("2016-10-06T08:10:25.000Z");
    expect(getDurationString("2016-10-05T03:40:02.000Z")).toMatchSnapshot();
    expect(getDurationString("2016-10-05T03:40:02.000Z", undefined, "short")).toMatchSnapshot();
    MockDate.reset();
  });
});
