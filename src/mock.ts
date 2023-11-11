import { faker } from '@faker-js/faker';
import { Column, Data, TableData } from './types';

const columns: Array<Column> = [
    {
        id: 'first_name',
        ordinalNo: 1,
        title: 'First Name',
        type: 'string',
    },
    {
        id: 'last_name',
        ordinalNo: 2,
        title: 'Last Name',
        type: 'string',
    },
    {
        id: 'age',
        ordinalNo: 4,
        title: 'age',
        type: 'number',
    },
    {
        id: 'employed',
        ordinalNo: 3,
        title: 'Employed',
        type: 'boolean',
    },
    {
        id: 'faworite_songs',
        ordinalNo: 5,
        title: 'Favorite Songs',
        type: 'selection',
    },
];

const data: Data = [];

for (let i = 0; i < 100; i++) {
    const songs = new Array(4).fill(1).map(() => faker.music.songName());
    let obj: any = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        age: faker.helpers.rangeToNumber({ min: 18, max: 65 }),
        employed: faker.datatype.boolean(),
        id: faker.string.uuid(),
        faworite_songs: {
            options: songs,
            selected: songs[0],
        },
    };

    data.push(obj);
}

export const tableData: TableData = {
    columns,
    data,
};
