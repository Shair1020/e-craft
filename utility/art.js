exports.shapeArtData = (body, files) => {
    const gallery = [];
    files.forEach(({ filename }) => {
        gallery.push(filename)
    })
    body.gallery = gallery;
    return body;
}