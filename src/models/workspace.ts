export interface WorkSpaceAttributes {
    name: string;
    domain: string;
    dropletName?: string;
    description?: string;
    accentColor?: string;
    logoUrl?: string;
    bannerUrl?: string;
}

export interface WorkSpace {
    id: string;
    attributes: WorkSpaceAttributes;
}

export interface WorkSpaces {
    id: string;
    name: string;
    ownerId: string;
    subdomain: string;
    domain?: string;
    dropletName?: string;
    description?: string;
    accentColor?: string;
    logoUrl?: string;
    bannerUrl?: string;
    productId?: string;
    startDate?: number;
    endDate?: number;
}
