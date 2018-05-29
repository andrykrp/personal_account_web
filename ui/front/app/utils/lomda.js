import { addIndex, map, forEach, complement, isEmpty } from 'ramda';

export const
    noop = () => {},
    mapIndex = addIndex(map),
    forEachIndex = addIndex(forEach),
    isNotEmpty = complement(isEmpty);
