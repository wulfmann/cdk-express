export const parsePath = (path: string) => {
    const pieces = path.split('/');
    const converted = pieces
        .filter((i) => i !== '')
        .map((piece) => {
            return piece.startsWith(':') ? `{${piece.substring(1)}}` : piece;
        });
    return converted;
};
