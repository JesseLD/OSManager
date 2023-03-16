if(process.env.NODE_ENV == "production"){
  module.exports = {
    mongoURI: "mongodb+srv://jesseluis120:Praiamar118@cluster0.sk2j8fo.mongodb.net/?retryWrites=true&w=majority"
  }
}else{
  module.exports = {
    mongoURI: "mongodb://127.0.0.1/osteste"
  }
}