/*
 Snack 1
Ottieni il titolo di un post con una Promise.

Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post 
dal link https://dummyjson.com/posts/{id}
*/

function getPostTitle(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((post) => resolve(post.title))
      .catch(reject);
  });
}

getPostTitle(1)
  .then((title) => console.log(`Il titolo del post è`, title))
  .catch((err) => console.error(err));
