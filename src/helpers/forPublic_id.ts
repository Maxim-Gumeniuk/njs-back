export function transformUrl(url: string): string {
    const startIndex = url.lastIndexOf("/") + 1;
    const endIndex = url.lastIndexOf(".");

    return url.substring(startIndex, endIndex);
}
