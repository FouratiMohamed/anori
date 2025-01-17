import { Color, darken, fromHsl, lighten, toCss, transparentize } from "@utils/color";
import { setPageBackground } from "@utils/mount";
import browser from 'webextension-polyfill';



export type Theme = {
    name: string,
    background: string,
    colors: {
        accent: Color,
        background: Color,
        text: Color,
    },
};

export const themes: Theme[] = [
    {
        name: 'Greenery',
        background: 'greenery.jpg',
        colors: {
            accent: fromHsl(147, 59.3, 44.3),
            text: fromHsl(0, 0, 100),
            background: fromHsl(162, 59.6, 17.5),
        }
    },
    {
        name: 'Forest lake',
        background: 'forest-lake.jpg',
        colors: {
            accent: fromHsl(193, 75.1, 60.6),
            text: fromHsl(0, 0, 100),
            background: fromHsl(200, 78.9, 22.4),
        }
    },
    {
        name: 'Mountains',
        background: 'mountains.jpg',
        colors: {
            accent: fromHsl(206, 100, 39.2),
            text: fromHsl(0, 0, 100),
            background: fromHsl(204, 94.2, 20.4),
        }
    },
    {
        name: 'Sakura',
        background: 'sakura.jpg',
        colors: {
            accent: fromHsl(327, 49.6, 75.9),
            text: fromHsl(0, 0, 100),
            background: fromHsl(337, 32.4, 44.1),
        }
    },
    {
        name: 'Sunflowers',
        background: 'sunflowers.jpg',
        colors: {
            accent: fromHsl(196, 53.4, 37.1),
            text: fromHsl(0, 0, 100),
            background: fromHsl(199, 36.5, 20.4),
        }
    },
    {
        name: 'Hygge',
        background: 'table.jpg',
        colors: {
            accent: fromHsl(40, 2.7, 56.5),
            text: fromHsl(0, 0, 100),
            background: fromHsl(25, 9.5, 24.7),
        }
    },
    {
        name: 'Maples',
        background: 'maple.jpg',
        colors: {
            accent: fromHsl(9, 69, 46),
            text: fromHsl(0, 0, 100),
            background: fromHsl(2, 35, 17),
        }
    },
    {
        name: 'Highlands',
        background: 'highlands.jpg',
        colors: {
            accent: fromHsl(40, 98, 47),
            text: fromHsl(0, 0, 100),
            background: fromHsl(31, 39, 25),
        }
    },
];

export const defaultTheme = themes[0].name;

export const applyTheme = (themeName: Theme["name"]) => {
    const theme = themes.find(t => t.name === themeName);
    if (!theme) return;
    setPageBackground(browser.runtime.getURL(`/assets/images/backgrounds/${theme.background}`));

    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
    }
    meta.content = toCss(theme.colors.background);
    document.head.appendChild(meta);

    const root = document.documentElement;
    root.style.setProperty('--background-image', `url('/assets/images/backgrounds/${theme.background}')`);
    root.style.setProperty('--accent', toCss(theme.colors.accent));
    root.style.setProperty('--accent-subtle', toCss(transparentize(theme.colors.accent, 0.5)));
    root.style.setProperty('--background', toCss(theme.colors.background));
    root.style.setProperty('--background-lighter', toCss(lighten(theme.colors.background, 0.05)));
    root.style.setProperty('--text', toCss(theme.colors.text));
    root.style.setProperty('--text-subtle-1', toCss(transparentize(theme.colors.text, 0.15)));
    root.style.setProperty('--text-subtle-2', toCss(transparentize(theme.colors.text, 0.35)));
    root.style.setProperty('--text-border', toCss(transparentize(theme.colors.text, 0.75)));
    root.style.setProperty('--text-disabled', toCss(darken(theme.colors.text, 0.45)));
};