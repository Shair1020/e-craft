exports.shapeArtData = (req) => {
    const { body, files, user } = req
    const gallery = [];
    files.forEach(({ filename }) => {
        gallery.push(filename)
    })
    body.gallery = gallery;
    body.artist = user._id
    return body;
}