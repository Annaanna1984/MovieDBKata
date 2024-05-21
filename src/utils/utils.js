import { _overviewLimit } from '../constants/constants';

export const wrapOverview = (text) => {
    if (text.length < _overviewLimit) return text;

    const substr = text.substring(0, _overviewLimit);
    return substr.substring(0, substr.lastIndexOf(' ')) + ' ...';
};

export const voteColor = (vote) => {
    if (vote < 3) return 'low';
    if (vote < 5) return 'medium';
    if (vote < 7) return 'high';
    return 'very-high';
};
