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
    {
        name: 'Forest',
        description: 'Forest landscape photograph',
        source: 'Flickr',
        sourceUrl: 'https://www.flickr.com/photos/26311710@N02/5263604778',
        author: 'Flickr user 26311710@N02',
        authorUrl: 'https://www.flickr.com/photos/26311710@N02/',
        license: 'CC BY 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
        filePath: 'src/assets/forest.jpg',
    },
    {
        name: 'Wind Turbines',
        description: 'Wind turbines for renewable energy',
        source: 'Openverse',
        sourceUrl: 'https://openverse.org/image/a8d84689-977a-4c0f-a1f5-a7aaac9422c7?q=wind+turbine&p=7',
        author: 'Openverse contributor',
        license: 'CC BY 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
        filePath: 'src/assets/Wind turbines.jpg',
    },
    {
        name: 'Duke Energy Coal Plant',
        description: 'Duke Energy\'s Cliffside Coal Plant',
        source: 'Openverse',
        sourceUrl: 'https://openverse.org/image/42e999fb-8c72-481c-9666-3c87094cf98b?q=coal+plant&p=11',
        author: 'Openverse contributor',
        license: 'CC BY 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
        filePath: 'src/assets/coal_plant_cut.png',
    },
    {
        name: 'Carbon Pricing Coalition Leadership Meeting',
        description: 'Carbon Pricing Coalition Leadership Meeting',
        source: 'Flickr',
        sourceUrl: 'https://www.flickr.com/photos/10816734@N03/26437675256',
        author: 'World Bank Photo Collection',
        license: 'CC BY-NC-ND 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/2.0/',
        filePath: 'src/assets/carbon_pricing_meeting.jpg',
    },
    {
        name: 'Carbon Pricing Coalition Leadership Meeting',
        description: 'Carbon Pricing Coalition Leadership Meeting',
        source: 'Flickr',
        sourceUrl: 'https://www.flickr.com/photos/10816734@N03/26437675256',
        author: 'World Bank Photo Collection',
        license: 'CC BY-NC-ND 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/2.0/',
        filePath: 'src/assets/carbon_pricing_meeting.jpg',
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
