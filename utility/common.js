class APIFeatures {
  constructor(model, queryObj) {
    this.model = model;
    this.queryObj = queryObj;
    this.query = null;
  }
  filter() {
    var { fields, sort, page, limit, ...resQueries } = this.queryObj;
    var queryString = JSON.stringify(resQueries);
    var modifiedQuery = queryString.replace(
      /\b(gt|lt|gte|lte|in)\b/g,
      (match) => {
        return `$${match}`;
      }
    );
    var queryObj = JSON.parse(modifiedQuery);
    //pass the query
    this.query = this.model.find(queryObj); /// Promise
    return this;
  }
  sort() {
    var { sort } = this.queryObj;
    if (sort) {
      sort = sort.split(",").join(" ");
      this.query = this.query.sort(sort); /// chain Promise
    } else {
      this.query = this.query.sort("createdAt"); /// chain Promise
    }
    return this;
  }
  fields() {
    var { fields } = this.queryObj;
    if (fields) {
      fields = fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    var { page, limit } = this.queryObj;
    page = Number(page) || 1;
    limit = Number(limit) || 4;
    var skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  get() {
    return this.query;
  }
}
module.exports = APIFeatures;
