// src/global.d.ts
declare module '*.module.scss' {
    import { DocumentNode } from 'module.scss';

    const value: DocumentNode;
    export = value;
}
