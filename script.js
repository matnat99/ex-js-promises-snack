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

/*
Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. 
Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, 
recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.
*/

function getPost(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        fetch(`https://dummyjson.com/users/${post.userId}`)
          .then((res) => res.json())
          .then((user) => {
            post.user = user;
            resolve(post);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

getPost(1)
  .then((userPost) => console.log(userPost))
  .catch((err) => console.error(err));

/*
Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. 
Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. 
Se il numero esce due volte di fila, stampa "Incredibile!".
*/

function creaLanciaDado() {
  let ultimoLancio = 0;

  function lanciaDado() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const probabilita = Math.random();

        if (probabilita > 0.2) {
          const numero = Math.floor(Math.random() * 6) + 1;

          if (numero === ultimoLancio) {
            console.log("Incredibile!");
          }

          ultimoLancio = numero;

          resolve(numero);
        } else {
          reject("Il dado si è incastrato!");
        }
      }, 3000);
    });
  }

  return lanciaDado;
}

const lanciaDado = creaLanciaDado();

lanciaDado()
  .then((risultato) => {
    console.log(`Il risultato è: ${risultato}`);
    return lanciaDado();
  })
  .then((risultato) => {
    console.log(`Il secondo risultato è: ${risultato}`);
    return lanciaDado();
  })
  .catch((err) => console.error(err));
