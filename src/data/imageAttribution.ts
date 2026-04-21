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
    {
        name: 'Module 1 Card — Storm Clouds above Sea',
        description: 'Card image for Module 1',
        source: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/storm-clouds-above-sea-14920363/',
        author: 'Connor Scott McManus',
        authorUrl: 'https://www.pexels.com/@connorscottmcmanus/',
        license: 'Pexels License',
        licenseUrl: 'https://www.pexels.com/license/',
        filePath: 'src/assets/module_1_card.webp',
    },
    {
        name: 'Module 2 Card — Serene Waterfall in Khyber Pakhtunkhwa, Pakistan',
        description: 'Card image for Module 2',
        source: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/serene-waterfall-in-khyber-pakhtunkhwa-pakistan-29049888/',
        author: 'asif khan',
        authorUrl: 'https://www.pexels.com/@asif-khan-779684638/',
        license: 'Pexels License',
        licenseUrl: 'https://www.pexels.com/license/',
        filePath: 'src/assets/module_2_card.webp',
    },
    {
        name: "Module 3 Card — Majestic Iceberg in Greenland's Arctic Waters",
        description: 'Card image for Module 3',
        source: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/majestic-iceberg-in-greenland-s-arctic-waters-33614456/',
        author: 'Chris Spain',
        authorUrl: 'https://www.pexels.com/@chris-spain-1559126760/',
        license: 'Pexels License',
        licenseUrl: 'https://www.pexels.com/license/',
        filePath: 'src/assets/module_3_card.webp',
    },
    {
        name: 'Module 4 Card — A pathway through a field of flowers',
        description: 'Card image for Module 4',
        source: 'Openverse (Flickr)',
        sourceUrl: 'https://openverse.org/image/1e1de1dd-33f7-402a-b247-0522d58ba54b?q=pathways&p=3',
        author: 'World Bank Photo Collection',
        authorUrl: 'https://www.flickr.com/photos/10816734@N03/',
        license: 'CC BY-NC-ND 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/2.0/',
        filePath: 'src/assets/module_4_card.webp',
    },
    {
        name: 'Module 5 Card — Crowd of People Marching on a Rally',
        description: 'Card image for Module 5',
        source: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/crowd-of-people-marching-on-a-rally-2975498/',
        author: 'Robin Erino',
        authorUrl: 'https://www.pexels.com/@robinerino/',
        license: 'Pexels License',
        licenseUrl: 'https://www.pexels.com/license/',
        filePath: 'src/assets/module_5_card.webp',
    },
    {
        name: 'Resources Card — View of a Rural Landscape in Autumn',
        description: 'Card image for Resources',
        source: 'Pexels',
        sourceUrl: 'https://www.pexels.com/photo/view-of-a-rural-landscape-in-autumn-14511652/',
        author: 'Anastasiya Pavlova',
        authorUrl: 'https://www.pexels.com/@anastasiya-pavlova-17630119/',
        license: 'Pexels License',
        licenseUrl: 'https://www.pexels.com/license/',
        filePath: 'src/assets/resources_card.webp',
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
