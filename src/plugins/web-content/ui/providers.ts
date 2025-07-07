import { addNavMenuSection } from '@vendure/admin-ui/core';

export default [
    addNavMenuSection({
        id: 'content',
        label: 'Website Content',
        items: [{
            id: 'content',
            label: 'Content',
            routerLink: ['/extensions/web-content'],
            icon: 'cursor-hand-open',
        }],
    },
    'catalog'),
];