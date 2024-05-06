const fs = require("node:fs/promises");
const herbs_and_spices = [
    "Salsa",
    "Sálvia",
    "Manjericão",
    "Manjerona",
    "Orégano",
    "Cebolinha",
    "Ciboulette",
    "Coentro",
    "Tomilho",
    "Hortelã",
    "Alecrim",
    "Açafrão",
    "Estragão",
    "Dill",
    "Louro",
    "Funcho",
    "Cúrcuma",
    "Gengibre",
    "Mostarda",
    "Anis Estrelado",
    "Cravo da Índia",
    "Canela",
    "Cardamomo",
    "Baunilha",
    "Zimbro",
    "Cominho",
    "Urucum",
    "Páprica",
    "Pimenta do reino",
    "Pimenta Rosa",
    "Sumac",
    "Noz Moscada",
    "Macis",
    "Gergelim",
    "Curry",
    "Zaatar",
    "Pimenta Siria",
    "Ervas de Provence",
    "Ervas Finas",
    "Quatre Épices",
    "Cinco Especiarias"
]

function getContent(herb, slug = "placeholder") {
    return `
![${herb}](/images/${slug}.png)

## Nome científico
    
*nomen scientificum*

## Sobre

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas commodo diam non venenatis. 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam ullamcorper turpis, nec iaculis massa. 
Curabitur velit ipsum, congue vel nulla eu, sodales vestibulum neque. 
Vivamus suscipit odio orci, eleifend dignissim metus tristique a. 
Vestibulum commodo nisl vel velit euismod interdum. 
Suspendisse consectetur sollicitudin volutpat. Nullam sit amet mauris congue, viverra justo at, posuere libero. 
Suspendisse posuere tortor sed nulla elementum, vel dapibus justo suscipit.

## Usos

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas commodo diam non venenatis. 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam ullamcorper turpis, nec iaculis massa. 
Curabitur velit ipsum, congue vel nulla eu, sodales vestibulum neque. 
Vivamus suscipit odio orci, eleifend dignissim metus tristique a. 
Vestibulum commodo nisl vel velit euismod interdum. 
Suspendisse consectetur sollicitudin volutpat. Nullam sit amet mauris congue, viverra justo at, posuere libero. 
Suspendisse posuere tortor sed nulla elementum, vel dapibus justo suscipit.

## Curiosidades

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas commodo diam non venenatis. 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam ullamcorper turpis, nec iaculis massa. 
Curabitur velit ipsum, congue vel nulla eu, sodales vestibulum neque. 
Vivamus suscipit odio orci, eleifend dignissim metus tristique a. 
Vestibulum commodo nisl vel velit euismod interdum. 
Suspendisse consectetur sollicitudin volutpat. Nullam sit amet mauris congue, viverra justo at, posuere libero. 
Suspendisse posuere tortor sed nulla elementum, vel dapibus justo suscipit.
`
}

function processHerbsAndSpices() {
    //order alphabetically with special characters
    herbs_and_spices.sort((a, b) => a.localeCompare(b, "pt-br", {sensitivity: "base"}))
    //reverse order
    herbs_and_spices.reverse()

    const posts = []

    for (let i = 0; i < herbs_and_spices.length; i++) {
        let herb = herbs_and_spices[i]
        //lower case, kebab-case without accents
        const slug = herb
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")

        const post = {
            title: herb,
            content: getContent(herb),
            slug: slug,
        }
        posts.push(post)
    }
    return posts
}

function getPostTemplate(post) {
    //return a hugo toml post template
    return `+++
title = "${post.title}"
draft = false
slug = "${post.slug}"
+++
${post.content}
`
}

async function createPosts(posts) {
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i]
        const template = getPostTemplate(post)
        const fileName = `./content/posts/${post.slug}.md`
        // await 1 second
        // await new Promise(resolve => setTimeout(resolve, 1000))
        //create file promise node.js
        console.log(`Creating post ${fileName}`)
        await fs.writeFile(fileName, template)
    }

}

(function () {
    createPosts(processHerbsAndSpices()).then(r => console.log("Posts criados com sucesso"))
})()