const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('', async(req, res) => {
    try {
        let url = 'http://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2020-12-02&' +
          'sortBy=popularity&' +
          'apiKey=edeb3c7dc89541fa9f68cf73416eb7a3';

        let newsAPI = await axios.get(url)
        let data = newsAPI.data.articles
        res.render('news', { articles: data })
    } catch (e) {
        if (e.response) {
            res.render('news', { articles: null })
            console.log(e.response.data)
            console.log(e.response.status)
            console.log(e.response.headers)
        } else if (e.request) {
            res.render('news', { articles: null })
            console.log(e.request)
        } else {
            res.render('news', { articles: null })
            console.log('Error', e.message)
        }
    }
})


newsRouter.get('/article/:title', async(req, res) => {
    let articleTitle = req.params.title

    try {
        let url = `http://newsapi.org/v2/everything?q=Apple&from=2020-12-02&
                    sortBy=popularity&apiKey=edeb3c7dc89541fa9f68cf73416eb7a3`;

        let newsAPI = await axios.get(url)
        let data = newsAPI.data.articles
        data.forEach((article) => {
            if(article.title === articleTitle) {
                res.render('newsSingle', { article })
            }
        })
    } catch (e) {
        if (e.response) {
            res.render('newsSingle', { article: null })
            console.log(e.response.data)
            console.log(e.response.status)
            console.log(e.response.headers)
        } else if (e.request) {
            res.render('newsSingle', { article: null })
            console.log(e.request)
        } else {
            res.render('newsSingle', { article: null })
            console.log('Error', e.message)
        }
    }
})


newsRouter.post('', async(req, res) => {
    let search = req.body.search
    console.log(search)
    try {
        let url = `http://newsapi.org/v2/everything?q=${search}&from=2020-12-02&
                    sortBy=popularity&apiKey=edeb3c7dc89541fa9f68cf73416eb7a3`;

        const newsAPI = await axios.get(url)
        let data = newsAPI.data.articles
        res.render('newsSearch', { articles: data })
    } catch (e) {
        if (e.response) {
            res.render('newsSearch', { articles: null })
            console.log(e.response.data)
            console.log(e.response.status)
            console.log(e.response.headers)
        } else if (e.request) {
            res.render('newsSearch', { articles: null })
            console.log(e.request)
        } else {
            res.render('newsSearch', { articles: null })
            console.log('Error', e.message)
        }
    }
})



module.exports = newsRouter