// parcel.config.js
module.exports = {
    transformers: {
        "*.html": ["@parcel/transformer-html"],
        "*.css": ["@parcel/transformer-css"],
        "*.js": ["@parcel/transformer-js"],
        "*.jpg": ["@parcel/transformer-image"],
        "*.jpeg": ["@parcel/transformer-image"],
        "*.png": ["@parcel/transformer-image"],
        "*.svg": ["@parcel/transformer-image"],
        "*.gif": ["@parcel/transformer-image"],
        "*.webp": ["@parcel/transformer-image"],
    },
    optimizers: {
        "*.jpg": ["@parcel/optimizer-imagemin"],
        "*.jpeg": ["@parcel/optimizer-imagemin"],
        "*.png": ["@parcel/optimizer-imagemin"],
        "*.svg": ["@parcel/optimizer-imagemin"],
        "*.gif": ["@parcel/optimizer-imagemin"],
        "*.webp": ["@parcel/optimizer-imagemin"],
    },
};
