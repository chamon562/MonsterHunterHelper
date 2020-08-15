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