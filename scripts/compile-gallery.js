'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const galleryPath = path.join(__dirname, '..', 'public', 'images', 'galerii')
const gallerySourcePath = path.join(__dirname, '..', 'src', 'galerii')
const galleryYamlPath = path.join(__dirname, '..', 'src', 'galerii', 'galerii.yaml')

const galleryFiles = fs.readdirSync(galleryPath)

const galleryData = galleryFiles
.filter((file) => {
    // remove files that are not images
    return file.match(/\.(jpg|jpeg|png|gif)$/i)
})
.map((file) => {
    const filePath = path.join(galleryPath, file)
    const fileStat = fs.statSync(filePath)
    const fileDate = new Date(fileStat.mtime)
    // filenames should be formatted like: "The title of the picture - Author.jpg"
    const [title, author] = file.split('.').slice(0, -1).join('.').split(' - ')

    return {
        file: file,
        title: title,
        author: author,
        date: fileDate,
    }
})
.sort((a, b) => {
    return b.date - a.date
})

const galleryYaml = yaml.dump(galleryData)
fs.writeFileSync(galleryYamlPath, galleryYaml)
