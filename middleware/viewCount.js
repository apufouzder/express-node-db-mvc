let count = 0;

const viewCount = (req, res, next) => {
    count++;
    console.log(count);

    // res.send("response m")
    next();
};

module.exports = viewCount;