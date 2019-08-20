'use strict';

export interface IIpRange {
    ipFrom: number;
    ipTo: number;
}

export type IDataTableEntry = IIpRange[];

export type DataTable = Record<string, IDataTableEntry>;
