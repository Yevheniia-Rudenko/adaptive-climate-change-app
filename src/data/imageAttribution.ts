/**
 * Central registry for all image attributions and credits
 * This file tracks the sources and licenses for all images used in the application
 */

export interface ImageAttribution {
    name: string;
    description: string;
    source: string;
    sourceUrl: string;
    author: string;
    authorUrl?: string;
    license: string;
    licenseUrl?: string;
    filePath: string;
}

export const imageAttributions: ImageAttribution[] = [
    {
        name: 'Earth from Space',
        description: 'Hero image on the home page showing Earth from space',
        source: 'Openverse',
        sourceUrl: 'https://openverse.org/image/6206e529-c246-47f7-828b-1174c8b6c813',
        author: 'NASA',
        authorUrl: 'https://www.nasa.gov/',
        license: 'Public Domain',
        licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
        filePath: 'src/assets/earth_img.jpg',
    },
    {
        name: 'Day of Climate Logo',
        description: 'Logo for Day of Climate organization',
        source: 'Day of Climate',
        sourceUrl: 'https://dayofclimate.org/',
        author: 'Day of Climate',
        license: 'Used with permission',
        filePath: 'src/assets/day_of_climate.png',
    },
    {
        name: 'Systems Awareness Lab Logo',
        description: 'Logo for MIT Systems Awareness Lab',
        source: 'MIT Systems Awareness Lab',
        sourceUrl: 'https://systemsawarenesslab.mit.edu/',
        author: 'MIT Systems Awareness Lab',
        license: 'Used with permission',
        filePath: 'src/assets/systemsAwarenessLabLogo.png',
    },
    {
        name: 'Module Icons',
        description: 'Custom illustrations for each learning module',
        source: 'Custom Created',
        sourceUrl: '',
        author: 'Adaptive Climate Change App Team',
        license: 'All Rights Reserved',
        filePath: 'src/assets/module*.png',
    },
    {
        name: 'Plutchik Emotion Model',
        description: 'Plutchik\'s wheel of emotions diagram',
        source: 'Public Domain',
        sourceUrl: '',
        author: 'Robert Plutchik',
        license: 'Public Domain',
        filePath: 'src/assets/Plutchik-Model-600.png',
    },
    {
        name: 'Climate Change Weather GIF',
        description: 'Animated GIF showing temperature changes and climate impact',
        source: 'GIPHY',
        sourceUrl: 'https://giphy.com/gifs/IntoAction-environment-heatwave-hot-outside-L2r4woXTLCrkOYK2IT',
        author: 'INTO ACTION',
        authorUrl: 'https://intoaction.com/',
        license: 'GIPHY Content License',
        licenseUrl: 'https://support.giphy.com/hc/en-us/articles/360020027752-GIPHY-Content-License',
        filePath: 'src/assets/Climate Change Weather GIF by INTO ACTION.gif',
    },
];

export interface Contributor {
    name: string;
    role: string;
    description?: string;
}

export const contributors: Contributor[] = [
    {
        name: 'Day of Climate',
        role: 'Content Partner',
        description: 'Educational content and climate change expertise',
    },
    {
        name: 'MIT Systems Awareness Lab',
        role: 'Research Partner',
        description: 'Systems thinking research and methodologies',
    },
];
