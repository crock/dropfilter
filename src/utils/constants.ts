
export const appUrl = process.env.NODE_ENV === "development"
    ? 'https://dev.domaincord.com'
    : `https://try.dropfilter.app`

export const lowercaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
export const uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const numericAlphabet = "0123456789";

export const allAlphanumericCharacters = lowercaseAlphabet + uppercaseAlphabet + numericAlphabet;

export const defaultBackorderServices = [
    {
        displayName: "Namejet",
        slug: "namejet",
        active: true
    },
    {
        displayName: "SnapNames",
        slug: "snapnames",
        active: true
    },
    {
        displayName: "GoDaddy Auctions",
        slug: "godaddy",
        active: true
    },
]

export const approvedDomains = []

export interface IOption {
    label: string;
    value: string;
}

export type IOutputFormat = 'JSON' | 'XML'
