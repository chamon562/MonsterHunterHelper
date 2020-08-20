# Project 2 Planning

Fork & Clone this repo.

## Part 1

Review the [Project 2 requirements](https://tmdarneille.gitbook.io/sei-ga-sea/11-projects/project-2#project-feedback-evaluation) and check out some [examples](https://www.google.com/url?q=https://tmdarneille.gitbook.io/sei-ga-sea/11-projects/past-projects/project2&sa=D&source=calendar&ust=1597596784944000&usg=AOvVaw1ihTzKFunxKsL2f6sIYdlC).

In this space below, list **THREE** ideas for your Project 2. For each idea, include [user stories](https://revelry.co/user-stories-that-dont-suck/) for each idea and a link to the API(s) you want to use for it.

--------------------------------------------------

1. THIS IS MY CHOICE. just throwing another video game api idea, this is another great game that people should know about.  https://docs.mhw-db.com/

---------------------------------------------------------

Make a PR when you're done!

---

## Part 2

In the space below:
* either embed or link a completed ERD for your approved P2 idea
* if there are any changes/additions to your user stories, place your full set of revised user stories here
* either embed or link wireframes for every page of your app

----------------------------------------------------------
### ERD
[ERD of my layout for Monster hunter](https://drive.google.com/file/d/1zE00jGnqVBFX9fxkTZVlTMEdNtbfZr3r/view?usp=sharing)
----------------------------------------------------------
### User Stories
Who => : Monster hunter is a big game that has so many things to do, but just like the title, what makes this game so great is hunting these amazingly dangerous monsters. Furthermore, if the player has successfully hunted the monster, an rng system is put in play for the drop rewards/items, and the player will need these items to be able to craft their armor and weapons. However, the catch is that the monster will not carry all the things they need to craft what the player wants. That will come from hunting multiple monsters, to come back full circle and create their weapon/gear. 

What => : The app is to help MH players see weapons, and Armor attributes as well as see the monsters they need to defeat in order to get the items needed to craft what they want. 

Why : This app can provide guindance for players, and give a faster way to access information they need for their items. For example, the Monster weakness and its items drops. Once the player clicks on the Monster it will show what the monster drops, and can make their judgement wether this Monster is worth their time. This helpful information can also be used to see the different attributes of Armor and its stats, and the same can go for the weapons. Also pictures always adds the cool factor how the armor looks along with the Monster they would have to face. Happy hunting they would say. 
----------------------------------------------------------
### Wireframes
- [Home Page Of Monster Hunter Wireframe] 
- Link:  (https://drive.google.com/file/d/1xfWjZm8Spr5Mg6aGLEmtHHhofPhhXnJZ/view?usp=sharing)

- Rough Sketch Link:(https://drive.google.com/file/d/1pbRF2LPzh50x4HSCEQv0IxRSofm20EVC/view?usp=sharing) 

- My rough Sketch of my wire frame idea for home page to on click to take to individual page with info.



----------------------------------------------------------

Make a PR when you're done!

aug 14th, 2020 created a weapon model with name and foreign key
- sequelize models:create --name weapon --attributes name:string,userId:integer
- Assocation link done in models folder for user.js
```js 
 static associate(models) {
      // define association here
      models.user.hasMany(models.weapon)
    }
```

- Association link done in models folder for weapon.js
```js
static associate(models) {
      // define association here
      //my logic thinking the many weapons belongs to one user that is logged in
      models.weapon.belongsTo(models.userId)
```
- sequelize db:migrate to add to my database
- After making one model for weapons, I will use this to start off for now. 
- downloaded npm i axios
## Goal for tomorrow aug 15th 2020
- Goal is to set up a model associate the user and the weapon, be able to get into the monster hunter api and have favorites on click for the user.
# TO DO
<!-- - pull from the monster hunter name  from the api -->
- set up get routes
<!-- - set up ejs to show on page -->


### aug 15th, 2020 progresss

- Road Block weapons.ejs shows Cannot read property 'image' of null using code:
```js
<img src="<%= w.assets.image %> " alt="">
```
1. weapons.ejs route shows controller linked in line 68 server.js
- 
```js
app.use('/weapon', require('./routes/weapon'))
```
2.  got data from monster hunter api 
```js
router.get('/', (req, res)=>{
    console.log('weapons route')
   
    let weaponsUrl = 'https://mhw-db.com/weapons'
    axios.get(weaponsUrl)
    .then(function(apiResponse){
        let weapons = apiResponse.data
        console.log('--------------------')
        console.log(weapons)
        console.log('--------------------')
        // render from views folder and name of exact ejs file
        res.render('weapons', {weapons})
    })
    .catch(error =>{
        console.log('error', error)
        res.render('error')
    })
})
```

3. shows data name and type from weapons.ejs
```js
div id="wep">
  <% if(weapons.length) { %> <% weapons.forEach(w =>{%>
  <ul>
    <a href="/weapon/<%= w.type%>">
      <h2><%= w.type %></h2>
      <p><%= w.name %> </p>
    <%= console.log(w.assets) %> 

    </a>
  </ul>

  <% }) %> 
  <% } else{ %>
  <h2>No weapons shown</h2>
  <% } %>
</div>
```

## Aug 16th 2020 progress
- set up get route for armor and got axios call to dispaly basic info
- set up get route for monster and got axios call to dispaly basic info
## Aug 16th 2020 Road Blocc
- Do not know how to dive in deeper to get more information from the data base. 
# TODO 
- want pictures for each weapon.ejs, monsters.ejs, and armors.ejs to display 
- when clicked on each weapon, monster, and armor to have a show page that displays valuable information about each one. 
- want web page to show index with info about the web page, then when logged in, it redirects to home page showing href Monster, Weapon, and armor. 
- create a favorites so when the user clicks on weapon, armor, or monster it will save to their models. 
### Wish List
- want a comment section inside each weapon show, armor show, and monster so the community can leave comments on whatever they want to say ie. experience it took to find, or how to find, and where people can ask questions to get answered from the community.
- want a like mechanic for each comment and be able to post a picutre. 


## Aug 17th 2020 Goals
- Dig into api file tree that has objects after it
## Aug 17th 2020 Progress 
- on isLoggedIn user is redirected to home page. server.js line 86
```js
// created middleware 10:29am aug 2020
app.get('/home', isLoggedIn , (req,res) =>{
  res.render('home')
})
```
- show.ejs pops up when the user clicks on the weapon, armor, monsters name. ** testing m.name to m.id to see if I can get the same thing.*** 
went from w.name to w.id to get the correct connections on my axios call in my weapons.ejs.
<a href="/weapon/<%= w.name %>">
<a href="/weapon/<%= w.id %>">
made it work for showing the name. now try to get data


## Aug 17th Road blocker
- my error code when i used req.params.id in my weapons.js to get more info 

weapons.js req.params.id is:  Buster Sword 1
error Error: Request failed with status code 404

its good that it shows the the name. 
but the page doesnt show. so going to change. my href="m.name"
to href="m.id" in my weapons.ejs

### Code Im proud of 
- originally I was able to get info from the the first obect in the crafting tree. but as the api got in deeper, higher level weapons had info stored in the next object over. I thought I was able to simply type the object before would come undefined so I figured, what if im able to just throw in an if statement saying that if this exist run all this info for the for first object if not then run the next objects info over. 
```js 
 <li>Craftable: <%= weapons.crafting.craftable %></li>
       <% if(weapons.crafting.craftingMaterials[0]){ %>
        <li>Crafting Tree routes: <%= weapons.crafting.branches[0] %></li>
        <p> Crafting Materials</p>
        <li>Id: <%= weapons.crafting.craftingMaterials[0].item.id%></li>
        <li>Rarity: <%= weapons.crafting.craftingMaterials[0].item.rarity%></li>
        <li>Carry Limit: <%= weapons.crafting.craftingMaterials[0].item.carryLimit%></li>
        <li>Value: <%= weapons.crafting.craftingMaterials[0].item.value%></li>
        <li>Material Name: <%= weapons.crafting.craftingMaterials[0].item.name%></li>
        <li>Description: <%= weapons.crafting.craftingMaterials[0].description%></li>

       <% } else { %>
        
        <li>Description: <%= weapons.crafting.upgradeMaterials[0].item.description%></li>
        <li>Id: <%= weapons.crafting.upgradeMaterials[0].item.id%></li>
        <li>Rarity: <%= weapons.crafting.upgradeMaterials[0].item.rarity%></li>
        <li>Carry Limit: <%= weapons.crafting.upgradeMaterials[0].item.carryLimit%></li>
        <li>Value: <%= weapons.crafting.upgradeMaterials[0].item.value%></li>
        <li>Material Name: <%= weapons.crafting.upgradeMaterials[0].item.name%></li>
        <li>Description: <%= weapons.crafting.upgradeMaterials[0].item.description%></li>
        <% } %>
```

## Aug 18th 2020 Goals
- get all information to show up for monsters and armor
- create add to favorites button
- create comment section in the weapon armor show.ejs

## Aug 18th 2020 Progress
- got info to dispaly for monsters.ejs and armors.ejs 

## Aug 18th 2020 Road block
- cant get my monster name to pop up on the page after i hit favorite 


## Aug 19th 2020 Goals
- get my monsters weapon and armor all showing on profile page when add favorite is clicked
- want to be able to edit and delete the favorite
## Aug 19th 2020 progress
- weapon names now show up, from getting help from TA Seanny. made a route for profile.js and put router.get in and then was able tof do db.weapon.findAll().then(weapons =>{res.render('profile', {weapons})})
- deleted monFave and put mfave.ejs because it was redirecting wasnt showing monFave so i named it the same as my mFave.js in my routes
- undo and migrate new model to have api id for weapons to give correct id to render. 
```js
// in migrations folder for weapons put in apiId 
apiId: {
        type: Sequelize.INTEGER
      },
*********************************

// in models folder weapon.js added in apiId
weapon.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    apiId: DataTypes.INTEGER
  },
*********************************
// in the console sequelize db:migrate:undo:all
// in the console sequelize db:migrate to refresh clean database and have apiId added in
// favorites.js added in apiId: req.body.apiId
db.weapon.findOrCreate({
      where: {
        name: req.body.name,
        userId: req.user.id,
        apiId: req.body.apiId,
      },
    })
*********************************

// weapons.ejs line 9 deleted userId and chnaged value to w.id inste4ad of w.apiId
 <form method="POST" action="/favorites">
    <input hidden type="text" name="name" value="<%= w.name %>" />
    <input hidden type="text" name="apiId" value="<%= w.id %>" />

*********************************
// profile.ejs line 7. changed from w.id to w.apiId
<a href="/weapon/<%= w.apiId %>">
```
## Aug 19th 2020 roadbloc
- road blocc progress was able to get the names from weapon models to show up on profile page i changed the method in the form in the weapons.ejs from POST to GET. because the issue was it was skipping the router.get and only running the router.post in the favorites.js
```js
<form method="POST" action="/favorites">
      <input hidden type="text" name="name" value="<%= w.name %>">
      <button href="/views/<%= w.id%>" class="btn btn-primary" type="submit">Add to Favorites</button>
    </form>
```
Above changed the method to Get and the value in the input to w.name instead of w.id
```js
<form method="GET" action="/favorites">
      <input hidden type="text" name="name" value="<%= w.id %>">
      <button href="/views/<%= w.id%>" class="btn btn-primary" type="submit">Add to Favorites</button>
    </form>
```
NOW TO CHECC if it still adds to my model when i click add favorites...

Doesnt add weapon to models when clicking add favorites 

# use later
index.js
const faveButtons = document.querySelectorAll("button.favorite");
for (let i = 0; i < faveButtons.length; i++) {
  faveButtons[i].addEventListener("click", (e) => {
    const cat = e.target.dataset.cat;
    const name = e.target.dataset.name;
    axios.post("/favorites/new", {cat, name} )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

weapons.ejs
<button class="favorite" data-name="<%= w.name %>" data-cat="weapon">Favorite</button>

favorites.js

const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");


router.get('/', (req, res)=>{
  db.weapon.findAll()
})

  // router.post('/new', (req, res) =>{
  //     const data = req.body
  //     console.log(data)
  //   db[data.cat].findOrCreate({
  //       where: {name: data.name, userId:req.user.id}
  //   })
  //   .then(()=>{
  //       //redirected to my pokemon page 
  //       res.redirect('/');
  //     })
  //     .catch((err) =>{
  //       console.log('error', err)
  //       res.send('error')
    
  //     })
  //     console.log(req.user.id)
    
  //   //   res.json(data)
  // })




module.exports = router;



router.get('/', (req, res) => {
  db.monster.findAll()
    .then(monsters => {
      console.log("LINE 10 favorite.js", monsters);
      res.render("profile", {monsters});
    })
    .catch((error) => {
      console.log("ERROR Line 14 profile.ejs 🐵🙈🙉🙊", error);
    });
});

router.post("/", (req, res) => {
  //db.pokemon is the name of the data table
  db.monster.findOrCreate({
      where: {
        name: req.body.name, 
        userId: req.user.id
      }
    })
    .then(() => {
      //redirected to my pokemon page
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log("favorites.js Line 49 error", err);
      res.render("error");
    });
});


this is for profile to show weapons from my models
<% Weapons.forEach(function(wFave) { %>
       <div>
           <h2><%= wFave %></h2>
       </div>
  <% }) %> 

  dont forget isLoggedin for profile.js