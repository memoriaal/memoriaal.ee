'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const publicGalleryPath = path.join(__dirname, '..', 'public', 'images', 'galerii')
const publicGalleryFromPath = path.join(publicGalleryPath, 'source')
const publicGalleryToPath = path.join(publicGalleryPath, 'public')
const gallerySourcePath = path.join(__dirname, '..', 'src', 'galerii')
const galleryYamlPath = path.join(gallerySourcePath, 'galerii.yaml')

const galleryFiles = fs.readdirSync(publicGalleryFromPath)

// remove extension from filename, then slugify, then add extension back
const slugify = (str) => {
    const ext = path.extname(str)
    const name = path.basename(str, ext)
    return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}${ext}`
}
// const slugify = (str) => {
//     return str
//     .toLowerCase()
//     .replace(/ /g, '_')
//     .replace(/[^\w-]+/g, '')
// }

const galleryData = galleryFiles
.filter((file) => {
    // skip files that are not images
    return file.match(/\.(jpg|jpeg|png|gif)$/i)
})
.map((file) => {
    const newFileName = slugify(file)
    // copy files to src/galerii
    const fileFromPath = path.join(publicGalleryFromPath, file)
    const fileToPath = path.join(publicGalleryToPath, newFileName)
    fs.copyFileSync(fileFromPath, fileToPath)
    const fileStat = fs.statSync(fileFromPath)
    const fileDate = new Date(fileStat.mtime)
    // filenames should be formatted like: "The title of the picture - Author.jpg"
    const [title, author] = file.split('.').slice(0, -1).join('.').split(' - ').map((str) => str.trim())

    return {
        file: newFileName,
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
